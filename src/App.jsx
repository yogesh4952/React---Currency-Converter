import background from "../public/bg";
import ConvertForm from "./Components/ConvertForm";
function App() {
  return (
    <>
      <div
        className="mainSection flex h-[100vh] w-[100vw] flex-col
         justify-center items-center "
        style={{
          backgroundImage: "url('../public/bg.avif')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="form-section bg-transparent "
          style={{
            backdropFilter: "blur(50px)",
            borderRadius: "20px",
          }}
        >
          <ConvertForm />
        </div>
      </div>
    </>
  );
}

export default App;
