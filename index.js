const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const port = process.env.PORT || 3000

function indexHtml(title, paragraph) {
  return `
<html lang="en" class="h-100" data-bs-theme="light">
  <head>

    <script src="https://getbootstrap.com/docs/5.3/assets/js/color-modes.js"></script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.122.0">
    <title>Otoroshi - Auth. Demo</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="/docs/5.3/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="manifest" href="/docs/5.3/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="/docs/5.3/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
    <link rel="icon" href="/docs/5.3/assets/img/favicons/favicon.ico">
    <meta name="theme-color" content="#712cf9">


    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
      }

      .bd-mode-toggle {
        z-index: 1500;
      }

      .bd-mode-toggle .dropdown-menu .active .bi {
        display: block !important;
      }
    </style>
    <style>
    .btn-light,
    .btn-light:hover,
    .btn-light:focus {
      color: #333;
      text-shadow: none;
    }
    body {
      text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
      box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    }
    .cover-container {
      max-width: 42em;
    }
    .nav-masthead .nav-link {
      color: rgba(255, 255, 255, .5);
      border-bottom: .25rem solid transparent;
    }
    .nav-masthead .nav-link:hover,
    .nav-masthead .nav-link:focus {
      border-bottom-color: rgba(255, 255, 255, .25);
    }
    .nav-masthead .nav-link + .nav-link {
      margin-left: 1rem;
    }
    .nav-masthead .active {
      color: #fff;
      border-bottom-color: #fff;
    }
    </style>
  </head>
  <body class="d-flex h-100 text-center text-bg-dark">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0">Auth. Demo</h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
            <a class="nav-link fw-bold py-1 px-0" href="#">Features</a>
          </nav>
        </div>
      </header>
      <main class="px-3">
        <h1>${title}</h1>
        <p class="lead">${paragraph}</p>
        <p class="lead">
          <a href="https://maif.github.io/otoroshi/manual/entities/auth-modules.html" target="_blank" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
        </p>
      </main>
      <footer class="mt-auto text-white-50">
        <p>Auth. Demo for <a class="text-white" target="_blank" href="https://www.otoroshi.io">Otoroshi</a> by <a target="_blank" class="text-white" href="https://www.cloud-apim.com">Cloud APIM</a></p>
      </footer>
    </div>  
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
</html>
  `;
}

const tokenKey = "secret";

app.get('/', (req, res) => {
  const isBehindOto = req.get('otoroshi-proxied-host');
  const isBehindAuth = Object.keys(req.cookies || {}).filter(key => key.indexOf("oto-papps-global-oauth") === 0).length > 0;
  const profile = req.get("Otoroshi-User-Profile");
  const parsedProfile = !!profile ? jwt.decode(profile) : null;
  // console.log(isBehindOto, isBehindAuth, Object.keys(req.cookies || {}), proto, parsedProfile)
  if (isBehindOto && isBehindAuth && profile) {
    res.status(200).contentType("text/html").send(indexHtml(`Hey ${parsedProfile.user.profile.name} (${parsedProfile.user.email}) !`, "Welcome back, we're happy to see you behind an Otoroshi instance and Authenticated"));
  } else if (isBehindOto && isBehindAuth) {
    res.status(200).contentType("text/html").send(indexHtml(`Hey Stranger !`, "We're happy to see you behind an Otoroshi instance and Authenticated"));
  } else  if (isBehindOto) {
    res.status(200).contentType("text/html").send(indexHtml(`Hey Stranger !`, "We're happy to see you behind an Otoroshi instance"));
  } else {
    res.status(200).contentType("text/html").send(indexHtml("Hey Stranger !", "This app is private, you shouldn't be able to view it !"));
  }
})

app.get('/oto_only', (req, res) => {
  try {
    const profile = req.get("Otoroshi-User-Profile");
    const parsedProfile = !!profile ? jwt.decode(profile) : null;
    const proto = req.get("Otoroshi-Challenge-In");
    const parsedProto = jwt.verify(proto, tokenKey, { algorithm: 'HS512' });
    const state = parsedProto.state;
    const ttl = 10 // by default its 30 seconds in the UI
    const now = Math.floor(Date.now() / 1000)
    const tokenOut = jwt.sign({ 'state-resp': state, iat: now, nbf: now, exp: now + ttl, aud: 'Otoroshi' }, tokenKey, { algorithm: 'HS512' });
    console.log(parsedProto)
    res.status(200).set('Otoroshi-Challenge-Out', tokenOut).contentType("text/html").send(indexHtml(`Hey ${parsedProfile.user.profile.name} (${parsedProfile.user.email}) !`, "Welcome back, we're happy to see you behind an Otoroshi instance and Authenticated"));
  } catch(e) {
    console.log(e)
    res.status(500).send({ error: 'you cannot access this app without otoroshi' });
  }
})

app.listen(port, () => {
  console.log(`demo-auth app listening on port ${port}`)
})