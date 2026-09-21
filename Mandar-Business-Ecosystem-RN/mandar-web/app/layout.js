export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mandar Community Ecosystem</title>
        <style>{`
          body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 0; background-color: #f4f6f8; display: flex; flex-direction: column; min-height: 100vh; }
          .container { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; }
          .logo { font-size: 2rem; font-weight: bold; color: #1e40af; margin-bottom: 20px; }
          .btn { background-color: #1e40af; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; margin-top: 20px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .btn:hover { background-color: #1e3a8a; }
          .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); max-width: 400px; width: 100%; }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="card">
            <div className="logo">Mandar</div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
