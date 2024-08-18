export default function Layout ({children}) {
    return (
        <html>
            <head>
                <title>silab</title>
            </head>
            <body>{children}</body>
        </html>
    );
}