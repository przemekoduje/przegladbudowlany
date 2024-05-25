
import BlogHome from './routes/blogHome/BlogHome';
import { 
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import BlogPost from './routes/blogPost/BlogPost';
import Layout from './routes/layout/Layout';
import Home from './routes/home/Home';

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
          path:"/blog",
          element: <BlogHome />
        },
        {
          path:"/blog/:id",
          element: <BlogPost />
        }

      ]
    }
  ]);
  
  
  return (
    
    
    
    
    <RouterProvider router={router}/>
  );
}

export default App;
