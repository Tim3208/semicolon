import MainLayOutFooter from "./Footer";
import MainLayOutHeader from "./Header";

function MainLayOut({ children }) {
  return (
    <>
      <div>
        <MainLayOutHeader />
        {children}
      </div>
      <MainLayOutFooter />
    </>
  );
}
export default MainLayOut;
