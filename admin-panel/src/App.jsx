import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import UserManagement from "./pages/UserManagement";
import ProtectedRoute from"./Services/ProtectedRoute";
import EditBlog from "./pages/EditBlog";
import BlogPreview from "./pages/BlogPreview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={ 
                 <ProtectedRoute>
                     <Dashboard />
                   </ProtectedRoute>} />
        <Route path="/blogs" element={
                    <ProtectedRoute>
                       <BlogList />
                     </ProtectedRoute>} />
        <Route path="/blogs/create" element={
                       <ProtectedRoute>
                          <BlogForm />
                        </ProtectedRoute>} />
        <Route path="/users" element={ 
                     <ProtectedRoute>
                        <UserManagement />
                      </ProtectedRoute>} />
        <Route path="/blogs/edit/:id"  element={
                              <ProtectedRoute>
                                 <EditBlog/>
                               </ProtectedRoute>
     }/>
<Route path="/blogs/preview"  element={
                              <ProtectedRoute>
                                <BlogPreview />
                              </ProtectedRoute>
     }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;