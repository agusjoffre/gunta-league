export default function Head() {
  const logoImageSRC = "/public/gunta-logo.png";

  return (
    <>
      <title>Generador de Torneos - Gunta League</title>
      <meta
        name="description"
        content="Crea y gestiona tus torneos deportivos fácilmente con Gunta League."
      />
      <meta
        name="keywords"
        content="generador de torneos, organización de torneos, gestión de torneos deportivos"
      />
      <meta property="og:title" content="Generador de Torneos - Gunta League" />
      <meta
        property="og:description"
        content="Crea y gestiona tus torneos deportivos fácilmente con Gunta League."
      />
      <meta property="og:image" content={logoImageSRC} />
      <meta property="og:url" content={process.env.APP_URL} />
    </>
  );
}
