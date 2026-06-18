import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import { Layout } from './components/layout/Layout';
import Tasks from './pages/Tasks';
import Stats from './pages/Stats';

export default function App() {
  return (
    <TodoProvider>
      <Layout>
        <Routes>
          <Route path="/" element="" />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </Layout>
    </TodoProvider>
  );
}
