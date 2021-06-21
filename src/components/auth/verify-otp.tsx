import { useState, useEffect, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import OtpInput from "react-otp-input";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Token } from "../../helpers/token";
import appContext from "../../contexts/AppContext";
import { HOME_VIEW } from "../../helpers/BotigaRouteFile";
import botigaMainLogo from "../../assets/icons/botiga-main-logo.svg";
import { getOTP, signWithOtp } from "../../services/auth-service";

import "./auth.scss";

type LocationState = {
  phone: string;
};

type MockType = {
  [key: string]: string | undefined;
};

type OTPProps = RouteComponentProps<MockType, MockType, LocationState>;

export const VerifyOtp = withRouter(
  ({ history, location }: OTPProps): JSX.Element => {
    const { setError, setBrandName } = useContext(appContext);
    const { state: { phone = "" } = {} } = location;
    const [otp, setOtp] = useState<string>("");
    const [sessionId, setSessionId] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let timerId: ReturnType<typeof setInterval>;

    useEffect(() => {
      getOtp();
      return () => clearInterval(timerId);
    }, []);

    function tick(): void {
      setTimeRemaining((t) => {
        if (t === 1) {
          clearInterval(timerId);
          return 0;
        }
        return t - 1;
      });
    }

    function getOtp(): void {
      sendOtp();
      setTimeRemaining(30);
      timerId = setInterval(tick, 1000);
    }

    function sendOtp(): void {
      getOTP(phone)
        .then((res) => {
          setSessionId(res.data["sessionId"]);
        })
        .catch((err) => {
          setError(true, err);
        });
    }

    async function verifyEnterdOTP() {
      const invalidOtpInput = otp === "" || otp.length !== 6;
      if (invalidOtpInput) {
        setError(true, "Please enter 6 digits OTP sent to your mobile");
        return;
      }
      try {
        setIsLoading(true);
        const response = await signWithOtp(phone, sessionId, otp);
        if (response.data["message"] === "createSeller") {
          setError(true, "Seller doesn't exists");
        } else {
          const {
            headers: { authorization },
            data,
          } = response;
          const token = new Token();
          if (authorization) {
            await token.setAuthenticationToken(authorization);
            setBrandName(data.brandName);
            goToHomeView();
          }
        }
      } catch (err) {
        setError(true, err);
      } finally {
        setIsLoading(false);
      }
    }

    function goToHomeView(): void {
      history.replace(HOME_VIEW);
    }

    const containerClass: string = isLoading
      ? "verify-otp disable-container"
      : "verify-otp";

    return (
      <div className={containerClass}>
        {isLoading && (
          <div className="view-loader">
            <CircularProgress />
          </div>
        )}
        <div className="main-logo-conatiner">
          <img className="main-logo" alt="botiga-logo" src={botigaMainLogo} />
        </div>
        <div className="description">
          Please enter OTP sent to your phone number {phone}
        </div>
        <div className="otpForm">
          <OtpInput
            className="verify-otp-inputs"
            value={otp}
            onChange={(val: string) => setOtp(val)}
            numInputs={6}
            separator={<span className="otp-seprator" />}
          />
          <div className="resend">
            {timeRemaining === 0 ? (
              <div onClick={getOtp} className="resendbtn">
                Resend OTP
              </div>
            ) : (
              <div className="resendText">Resend OTP in {timeRemaining}s</div>
            )}
          </div>
          <Button
            onClick={verifyEnterdOTP}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disableElevation
          >
            Verify OTP
          </Button>
        </div>
      </div>
    );
  }
);
