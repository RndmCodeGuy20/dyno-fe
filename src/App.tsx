import { DnsRecordProvider } from "./context/DNSRecordContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <DnsRecordProvider>
      <Dashboard />
    </DnsRecordProvider>
  );
}

export default App;