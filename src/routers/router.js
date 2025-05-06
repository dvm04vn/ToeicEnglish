// import Auth from "../components/Auth";
import HomeLayout from "../layouts/HomeLayout";
import Answers from "../pages/Answers";
// import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Learning from "../pages/Learning-paths";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Topic from "../pages/Topic";


const PrivateRouters = [

];

const PublicRouters = [
    {path: '/', component :  Home, layout : HomeLayout},
    // {path: '/auth', component : Auth, layout: HomeLayout},
    {path: 'learning-paths', component: Learning, layout: HomeLayout},
    {path: '/quiz/:id', component: Quiz, layout: HomeLayout},
    {path: '/topic', component: Topic, layout: HomeLayout},
    {path: '/answers', component: Answers, layout: HomeLayout},
    {path: '/result/:id', component: Result, layout: HomeLayout}
];

export { PrivateRouters, PublicRouters};