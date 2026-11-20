<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>CSSP Garments Trading</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Inter:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="./Assets/logo-light-text.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="css files/aboutus_style.css">
</head>
<body class="about-page">
  <div class="prog" id="prog"></div>

  <nav class="nav" id="nav" aria-label="Main">
    <a class="brand" href="index.php#top" aria-label="CSSP home"><img src="./Assets/logo-light-text.png" alt="">CSSP</a>
    <ul class="menu" id="menu">
      <li class="dd"><button class="ddb" aria-expanded="false">Products <i
            class="fa-solid fa-chevron-down"></i></button>
        <div class="panel mega">
          <div class="col">
            <h4>Uniforms</h4>
            <div class="thumb"><i class="fa-solid fa-user-tie"></i></div>
            <p>Maritime &amp; Culinary Uniforms</p><a class="pill" href="./trial.php">Gear Up</a>
          </div>
          <div class="col">
            <h4>Safety Footwear</h4>
            <div class="thumb"><i class="fa-solid fa-shoe-prints"></i></div>
            <p>Steel-toe Safety Shoe</p><a class="pill" href="new_index.html#preview">Secure Step</a>
          </div>
        </div>
      </li>
      <li class="dd"><button class="ddb" aria-expanded="false">About Us <i
            class="fa-solid fa-chevron-down"></i></button>
        <div class="panel cols">
          <div class="col">
            <h4>Company</h4><a href="#overview"><i class="fa-solid fa-anchor"></i>Our Story</a><a href="#owner"><i
                class="fa-solid fa-people-group"></i>Our Craft</a><a href="#locations"><i
                class="fa-solid fa-house"></i>Location</a>
          </div>
          <div class="col">
            <h4>Support</h4><a href="new_index.html#support"><i class="fa-solid fa-circle-question"></i>FAQ</a><a href="new_index.html#contact"><i
                class="fa-solid fa-envelope"></i>Contact Us</a><a href="#site-footer"><i
                class="fa-solid fa-file-lines"></i>Policies</a>
          </div>
        </div>
      </li>
      <li class="only-m"><button class="ddb" data-open="account"><span><i class="fa-solid fa-circle-user"></i>&nbsp;
            Account</span></button></li>
      <li class="only-m"><button class="ddb" data-open="search"><span><i class="fa-solid fa-magnifying-glass"></i>&nbsp;
            Search</span></button></li>
    </ul>
    <div class="ctl">
      <div class="dd"><button class="cur" aria-expanded="false" aria-label="Currency"><i
            class="fa-solid fa-coins"></i><span id="curCode">PHP</span><i class="fa-solid fa-chevron-down"></i></button>
        <div class="panel curp"><button data-cur="PHP">₱ PHP</button><button data-cur="USD">$ USD</button><button
            data-cur="EUR">€ EUR</button></div>
      </div>
      <button class="ib" id="cartBtn" aria-label="Open cart"><i class="fa-solid fa-cart-shopping"></i><span
          class="badge-c" id="cartCount">0</span></button>
      <button class="ib" id="searchBtn" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button class="ib" id="acct" data-open="account" aria-label="Account"><i
          class="fa-solid fa-circle-user"></i></button>
      <button class="ib" id="tg" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
      <button class="pill" data-open="quote">Get a Quote</button>
      <button class="ib burger" id="burger" aria-label="Menu" aria-expanded="false"><i
          class="fa-solid fa-bars"></i></button>
    </div>
  </nav>

  <!-- HERO -->
  <header class="ab-hero" id="top">
    <div class="ab-hero-bg" aria-hidden="true">
      <img class="slot" src="Assets/About Us/HISTORY-2024.JPG" alt="" data-slot="hero-photo-1">
    </div>
    <div class="ab-hero-copy">
      <div class="lbl ab-hero-kicker">[ Maritime Grade Equipment ]</div>
      <h1>
        Designed in <span class="ab-ph-font">Philippines</span>
        <span class="ab-hero-since">Since 2024.</span>
      </h1>
      <p class="ab-lead">
        We specialize in crafting and supplying reliable maritime uniforms, coveralls, kitchen wear, safety footwear,
        and protective gear—built for durability, comfort, and daily crew performance.
      </p>
    </div>
  </header>

  <div class="wave ab-hero-wave" aria-hidden="true">
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
      <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="currentColor"/>
    </svg>
  </div>

  <!-- COMPANY OVERVIEW -->
  <section id="overview">
    <div class="ab-two-col">
      <div>
        <div class="lbl">[ Company Overview ]</div>
        <h2>Who we are and how we started?</h2>
      </div>
      <div class="ab-copy">
        <p>
          <b>CSSP Garments Trading</b> is a Philippine-based garments and workwear trading enterprise rooted in
          <b>Antipolo, Rizal</b>, operating since <b>2024</b> with a clear commitment to supplying
          dependable, well-constructed uniforms, work garments, and safety equipment built for everyday operational
          demands.
        </p><br>
        <p>
          What began as hands-on garment production and direct, personal coordination with local clients steadily grew
          into a dedicated supplier for maritime crews, culinary and hospitality teams, industrial workplaces, schools,
          and organizations that require consistent bulk orders without sacrificing fabric durability, clean stitching, or
          agreed delivery schedules.
        </p><br>
        <p>
          We understand that reliable workwear directly supports comfort, confidence, and safety on the job, whether a
          crew member is working long shifts onboard a vessel, inside a busy commercial kitchen, or on an active field
          and warehouse floor. Because of this, we pay close attention to material selection, practical cuts, and
          consistent sizing across batches.
        </p><br>
        <p>
          Every batch that leaves our workshop goes through careful fabric, sizing, and seam inspections before
          release, so whether a client is placing an initial team order, requesting samples, or scheduling repeat
          restocks, every piece arrives ready for dependable daily wear from day one.
        </p>
      </div>
    </div>
  </section>

  <!-- STATEMENT SHOWCASE -->
  <section class="ab-showcase" id="manifesto">
    <div class="ab-showcase-slides" aria-hidden="true">
      <img class="slot active" src="Assets/About Us/PEOPLE-HARDWORK.JPG" alt="" data-slot="showcase-slide-1">
      <img class="slot" src="Assets/About Us/PEOPLE-DEDICATION.JPG" alt="" data-slot="showcase-slide-2">
      <img class="slot" src="Assets/About Us/PEOPLE-TEAMWORK.JPG" alt="" data-slot="showcase-slide-3">
      <img class="slot" src="Assets/About Us/PEOPLE-PASSION.JPG" alt="" data-slot="showcase-slide-4">
    </div>

    <div class="ab-showcase-copy">
      <h2 class="ab-stack-words" aria-label="Craft. Safe. Standard. Pure.">
        <span>CRAFT.</span>
        <span>SAFE.</span>
        <span>STANDARD.</span>
        <span>PURE.</span>
      </h2>
    </div>
  </section>

  <!-- OWNERS AND MAKERS -->
  <section class="ab-people-section" id="owner">
    <div class="lbl">[ THE PEOPLE BEHIND IT ]</div>
    <h2 class="ab-people-title ab-section-question">Who makes every piece?</h2>

    <!-- BLOCK 1: OWNERS — PHOTO LEFT / STORY RIGHT -->
    <div class="ab-people-row ab-owner-row">
      <div class="ab-people-media">
        <img src="Assets/About Us/TAILOR-OWNER.jpg" alt="Mr. and Mrs. Pacleb of CSSP Garments Trading">
      </div>

      <section class="ab-people-copy" aria-label="Owners Story">
        <span class="ab-people-role">OWNERS AND FOUNDERS</span>
        <h3 class="ab-people-subtitle">Mr. and Mrs. Pacleb</h3>
        <p class="ab-people-text">
          At the heart of CSSP Garments Trading are Mr. and Mrs. Pacleb—hands-on leaders who built the business from practical experience, patience, and a steady commitment to quality. Rather than treating workwear as an afterthought or taking shortcuts when schedules get tight, they stay closely involved in every stage of the operation—from choosing fabrics that can handle real working conditions to refining fit and keeping timelines dependable.
        </p>
        <p class="ab-people-text">
          For them, every order represents trust placed in CSSP Garments Trading by teams and crews who rely on their gear day after day. Their leadership sets a grounded tone across the floor: build things properly the first time, stand behind every specification, and treat every client’s requirement with seriousness and care.
        </p>
      </section>
    </div>

    <!-- BLOCK 2: MAKERS — STORY LEFT / AUTO SLIDESHOW RIGHT -->
    <div class="ab-people-row ab-makers-row" id="makers">
      <section class="ab-people-copy" aria-label="Makers Story">
        <span class="ab-people-role">THE MAKERS</span>
        <h3 class="ab-people-subtitle">Hands Behind Every Piece</h3>
        <p class="ab-people-text">
          Alongside them is a dedicated team of makers who turn raw materials into finished workwear built for daily performance. From laying out and cutting patterns with care to guiding heavy and light fabrics cleanly through every seam, their work relies on steady focus, practiced skill, and quiet coordination from start to finish.
        </p>
        <p class="ab-people-text">
          Before a single piece leaves for delivery, every stitch, measurement, and finish is checked so crews receive uniforms and gear that hold up when put to work. It is a shared craft shaped by consistency, pride in honest labor, and the collective effort of people who care about what they make long after the machine stops.
        </p>
      </section>

      <div class="ab-makers-slideshow" data-makers-slideshow aria-label="Makers photo slideshow">
        <div class="ab-makers-slides">
          <figure class="ab-makers-slide is-active">
            <img src="Assets/About Us/HISTORY-2025.JPG" alt="Makers working on garments at CSSP Garments Trading">
          </figure>
          <figure class="ab-makers-slide">
            <img src="Assets/About Us/PEOPLE-DEDICATION.JPG" alt="Stitching and garment preparation by the makers team">
          </figure>
          <figure class="ab-makers-slide">
            <img src="Assets/About Us/PEOPLE-HARDWORK.JPG" alt="Quality inspection and batch preparation before dispatch">
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- LOCATIONS -->
  <section class="ab-locations-section" id="locations" data-locations-reveal>
    <div class="lbl">[ LOCATIONS AND REACH ]</div>
    <h2 class="ab-people-title ab-section-question">Where do we operate?</h2>

    <div class="ab-locations-grid">
      <div class="ab-locations-intro" data-loc-anim>
        <span class="ab-people-role">OPERATIONS AND FULFILLMENT</span>
        <p class="ab-people-text">
          Our day-to-day operations are anchored in Antipolo, Rizal, where planning, garment checks, and order coordination happen close at hand. From there, we support smooth scheduling and dependable delivery to crews and organizations across nearby cities and key shipping corridors.
        </p>
      </div>

      <div class="ab-locations-list">
        <div class="ab-location-item" data-loc-anim style="--loc-delay: 0.1s;">
          <span class="ab-location-tag">PRIMARY BASE</span>
          <h3 class="ab-location-name">Antipolo, Rizal</h3>
          <p class="ab-people-text">
            Where order coordination, specification review, and batch preparation stay closely aligned with our daily workflow.
          </p>
        </div>

        <div class="ab-location-item" data-loc-anim style="--loc-delay: 0.22s;">
          <span class="ab-location-tag">DELIVERY AND COORDINATION</span>
          <h3 class="ab-location-name">Metro Manila and Key Maritime Hubs</h3>
          <p class="ab-people-text">
            Coordinated dispatch and pickup arrangements designed to keep timelines clear for teams operating across wider routes.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CLOSING EDITORIAL SIGN-OFF -->
  <section class="ab-closing" id="closing" aria-label="Closing Sign-off">
    <p class="ab-closing-kicker">WELCOME TO CSSP GARMENTS TRADING</p>
    <p class="ab-closing-statement">
      Workwear built to last, fit for every shift, and made for the crew that wears it.
    </p>
    <p class="ab-closing-sub">
      WHEREVER THE JOB TAKES YOU, WE'LL OUTFIT YOU THERE.
    </p>
    <div class="ab-closing-mark" aria-label="CSSP">CSSP</div>
    <p class="ab-closing-tag">Built for the Work Ahead.</p>
  </section>

  <!-- FOOTER -->
  <footer id="site-footer">
    <div class="wave" aria-hidden="true">
      <svg class="wv wv1" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,70 Q300,10 600,70 T1200,70 T1800,70 T2400,70 V120 H0 Z"/></svg>
      <svg class="wv wv2" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,66 Q150,14 300,66 T600,66 T900,66 T1200,66 T1500,66 T1800,66 T2100,66 T2400,66 V120 H0 Z"/></svg>
      <svg class="wv wv3" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,88 Q100,48 200,88 T400,88 T600,88 T800,88 T1000,88 T1200,88 T1400,88 T1600,88 T1800,88 T2000,88 T2200,88 T2400,88 V120 H0 Z"/></svg>
    </div>
    <div class="fgrid">
      <div class="fbrand"><img src="Assets/logo-light-text.png" alt="CSSP logo">CSSP</div>
      <div>
        <h4>Navigation</h4>
        <a href="index.html#story">Story</a>
        <a href="index.html#craft">Craft</a>
        <a href="index.html#preview">Products</a>
      </div>
      <div>
        <h4>Connect</h4>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="tel:+639000000000">+63 900 000 0000</a>
        <a href="mailto:hello@example.com">hello@example.com</a>
        <a href="index.html#support">Support</a>
      </div>
    </div>
    <div class="legal">
      <span>© 2026 CSSP Garments Trading</span>
      <span>Privacy · Terms</span>
    </div>
    <div class="ftk" aria-hidden="true">
      <div class="trk">
        <span>Maritime Coveralls <i class="fa-solid fa-anchor"></i></span>
        <span>Chef Uniforms <i class="fa-solid fa-anchor"></i></span>
        <span>Steel-toe Shoes <i class="fa-solid fa-anchor"></i></span>
        <span>Safety Helmets <i class="fa-solid fa-anchor"></i></span>
        <span>Life Jackets <i class="fa-solid fa-anchor"></i></span>
        <span>Winter Jackets <i class="fa-solid fa-anchor"></i></span>
        <span>Work Gloves <i class="fa-solid fa-anchor"></i></span>
        <span>Maritime Coveralls <i class="fa-solid fa-anchor"></i></span>
        <span>Chef Uniforms <i class="fa-solid fa-anchor"></i></span>
        <span>Steel-toe Shoes <i class="fa-solid fa-anchor"></i></span>
        <span>Safety Helmets <i class="fa-solid fa-anchor"></i></span>
        <span>Life Jackets <i class="fa-solid fa-anchor"></i></span>
        <span>Winter Jackets <i class="fa-solid fa-anchor"></i></span>
        <span>Work Gloves <i class="fa-solid fa-anchor"></i></span>
      </div>
    </div>
  </footer>

  <!-- FLOATING BUTTONS + OVERLAYS -->
  <div class="fabs">
    <button class="fb" id="toTop" aria-label="Back to top"><i class="fa-solid fa-chevron-up"></i></button>
    <div class="fm" id="fm">
      <div class="fm-list">
        <button class="fb" data-info="call" aria-label="Call us" style="--k:2"><i class="fa-solid fa-phone"></i></button>
        <button class="fb" data-info="msg" aria-label="Email us" style="--k:1"><i class="fa-solid fa-envelope"></i></button>
        <button class="fb" data-info="share" aria-label="Share link" style="--k:0"><i class="fa-solid fa-share-nodes"></i></button>
      </div>
      <button class="fb main" id="fmMain" aria-expanded="false" aria-label="Contact options"><i class="fa-solid fa-plus"></i></button>
    </div>
  </div>
  <div class="finfo" id="finfo" aria-live="polite"><b></b><span></span><a href="#"></a></div>

  <aside class="drawer" id="drawer" aria-label="Cart">
    <h3>Your cart</h3>
    <div id="cartList"></div>
    <div class="tot"><span>Total</span><span id="cartTot"></span></div>
    <button class="pill" data-open="quote">Request a Quote</button>
    <button class="pill o" data-close style="margin-top:8px">Close</button>
  </aside>

  <div class="ov" id="quote">
    <form class="box" novalidate>
      <button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      <h3>Request a quote</h3>
      <label>Name</label><input name="name" required>
      <div class="err"></div>
      <label>Email</label><input name="email" type="email" required>
      <div class="err"></div>
      <label>Product type</label>
      <select name="type">
        <option>Coveralls &amp; uniforms</option>
        <option>Chef &amp; kitchen</option>
        <option>Jackets &amp; rainwear</option>
        <option>Safety footwear</option>
        <option>PPE</option>
        <option>Seafarer essentials</option>
      </select>
      <label>Quantity</label><input name="qty" type="number" min="1" required>
      <div class="err"></div>
      <label>Message</label><textarea name="msg" rows="3"></textarea>
      <button class="pill">Send request</button>
    </form>
  </div>

  <div class="ov" id="account">
    <form class="box" novalidate>
      <button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      <div class="tabs">
        <button type="button" class="on" data-tab="in">Log in</button>
        <button type="button" data-tab="up">Create account</button>
      </div>
      <div id="nameRow" hidden><label>Full name</label><input name="name"><div class="err"></div></div>
      <label>Email</label><input name="email" type="email" required>
      <div class="err"></div>
      <label>Password</label><input name="pw" type="password" minlength="6" required>
      <div class="err"></div>
      <button class="pill" id="acctGo">Log in</button>
    </form>
  </div>

  <div class="ov sov" id="search">
    <div class="box">
      <button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      <h3>Search products</h3>
      <input id="q" placeholder="Coverall, boots, helmet..." autocomplete="off">
      <div class="sr" id="sr"></div>
    </div>
  </div>

  <script src="js files/aboutus_script.js"></script>
  <script src="js files/script.js"></script>
</body>
</html>