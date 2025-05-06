import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRouters } from "./routers/router";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <>
        <Router>
          <div className="App">
            <Routes>
              {
                // router public
                PublicRouters.map((item,index) => {
                  const Layout = item.layout || DefaultLayout;
                  const Page = item.component;
                  return (
                      <Route key={index}
                        path={item.path}
                        element={
                          <Layout>
                            <Page/>
                          </Layout>
                        }
                      />
                  );
                })
              }
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
