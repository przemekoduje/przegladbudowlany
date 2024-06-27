
import BlogHome from './routes/blogHome/BlogHome';
import { 
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import BlogPost from './routes/blogPost/BlogPost';
import Layout from './routes/layout/Layout';
import Home from './routes/home/Home';
import Success from './routes/success/Success';
import Auth from './routes/auth/Auth';
import Console from './routes/console/Console';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/success",
          element: <Success />
        },
        {
          path:"/blog",
          element: <BlogHome />
        },
        
        {
          path:"/blog/:id",
          element: <BlogPost />
        },
        {
          path:"/console",
          element: <Console />
        }
      ]
    }
  ]);
  
  return (
    
    
    <RouterProvider router={router}/>
  );
}

export default App;
