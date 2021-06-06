import "./botiga-page-view.scss";

type botigaPageViewProps = {
  children: React.ReactNode;
};

const BotigaPageView = ({ children }: botigaPageViewProps): JSX.Element => (
  <div className="botiga-page-view">{children}</div>
);

export default BotigaPageView;
