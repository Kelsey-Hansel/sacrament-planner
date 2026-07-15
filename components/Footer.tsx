export default function Footer() {
    return (
        <footer className="bg-blue-500 text-white p-4">
            <div className="container mx-auto text-center">
                <p>Copyright &copy; {new Date().getFullYear()} | Kelsey Hansel | All rights reserved.</p>
            </div>    
        </footer>
  );
}