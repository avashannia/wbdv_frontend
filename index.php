<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>CSSP Garments Trading</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="./css files/style.css">
</head>
<body>
<div class="prog" id="prog"></div>

<nav class="nav" id="nav" aria-label="Main">
  <a class="brand" href="#top" aria-label="CSSP home">CSSP</a>
  <ul class="menu" id="menu">
    <li class="dd"><button class="ddb" aria-expanded="false">Products <i class="fa-solid fa-chevron-down"></i></button>
      <div class="panel mega">
        <div class="col"><h4>Uniforms</h4><div class="thumb"><i class="fa-solid fa-user-tie"></i></div><p>Maritime &amp; Culinary Uniforms</p><a class="pill" href="#./trial.php">Gear Up</a></div>
        <div class="col"><h4>Safety Footwear</h4><div class="thumb"><i class="fa-solid fa-shoe-prints"></i></div><p>Steel-toe Safety Shoe</p><a class="pill" href="#preview">Secure Step</a></div>
      </div></li>
    <li class="dd"><button class="ddb" aria-expanded="false">About Us <i class="fa-solid fa-chevron-down"></i></button>
      <div class="panel cols">
        <div class="col"><h4>Company</h4><a href="#story"><i class="fa-solid fa-anchor"></i>Our Story</a><a href="#craft"><i class="fa-solid fa-people-group"></i>Our Craft</a><a href="#contact"><i class="fa-solid fa-house"></i>Location</a></div>
        <div class="col"><h4>Support</h4><a href="#support"><i class="fa-solid fa-circle-question"></i>FAQ</a><a href="#contact"><i class="fa-solid fa-envelope"></i>Contact Us</a><a href="#site-footer"><i class="fa-solid fa-file-lines"></i>Policies</a></div>
      </div></li>
    <li class="only-m"><button class="ddb" data-open="account"><span><i class="fa-solid fa-circle-user"></i>&nbsp; Account</span></button></li>
    <li class="only-m"><button class="ddb" data-open="search"><span><i class="fa-solid fa-magnifying-glass"></i>&nbsp; Search</span></button></li>
  </ul>
  <div class="ctl">
    <div class="dd"><button class="cur" aria-expanded="false" aria-label="Currency"><i class="fa-solid fa-coins"></i><span id="curCode">PHP</span><i class="fa-solid fa-chevron-down"></i></button>
      <div class="panel curp"><button data-cur="PHP">₱ PHP</button><button data-cur="USD">$ USD</button><button data-cur="EUR">€ EUR</button></div></div>
    <button class="ib" id="cartBtn" aria-label="Open cart"><i class="fa-solid fa-cart-shopping"></i><span class="badge-c" id="cartCount">0</span></button>
    <button class="ib" id="searchBtn" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
    <button class="ib" id="acct" data-open="account" aria-label="Account"><i class="fa-solid fa-circle-user"></i></button>
    <button class="ib" id="tg" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
    <button class="pill" data-open="quote">Get a Quote</button>
    <button class="ib burger" id="burger" aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
  </div>
</nav>

<header class="hero" id="top">
  <video autoplay muted loop playsinline preload="auto"><source src="assets/bgvideo.mp4" type="video/mp4"></video>
  <div class="hero-top"><button class="pill" data-open="quote">Get a Quote</button><br>Quality garments, bulk orders and custom uniforms for crews, kitchens and teams.</div>
  <div class="hero-row">
    <h1 class="wm">CSSP</h1>
    <div class="fab"><small>New arrivals</small><img src="assets/placeholder.svg" alt="Spring Collection"><span>Spring Collection</span></div>
  </div>
  <a class="explore" href="#story"><span>Scroll to explore</span><i><b></b></i></a>
</header>

<section class="intro" id="story">
  <div class="lbl rv">[ Tested, not promised ]</div>
  <h2 class="rv">Seams that survive every shift.</h2>
  <p class="sub rv">Every uniform is stitched, stressed and inspected before it ever reaches your crew.</p>
  <div class="stats">
    <div class="sc rv"><b data-count="40" data-suf="+">0</b><span>wash cycles tested</span></div>
    <div class="sc rv"><b data-count="3" data-suf="×">0</b><span>rows of reinforced stitching</span></div>
    <div class="sc rv"><b data-count="100" data-suf="%">0</b><span>inspected before dispatch</span></div>
  </div>
</section>

<section class="fill"><p id="fillText">Stitched to last. Tested to be trusted. Built for the crew that wears it, from the galley to the engine room.</p></section>

<section id="craft">
  <div class="lbl rv">[ The CSSP standard ]</div>
  <h2 class="rv" style="margin-bottom:48px">Four checks. Zero shortcuts.</h2>
  <div class="stack">
    <article class="sk rv" style="--n:0"><div><h3>Seam strength</h3><p>Pull-tested at stress points: shoulders, crotch, underarm and pockets.</p><a class="pill o" href="#preview">See the line-up</a></div>
      <div class="vis"><label>Seam pull strength <span>96%</span></label><div class="bar" style="--w:96%"><i></i></div><label>Stitch density <span>92%</span></label><div class="bar" style="--w:92%"><i></i></div><label>Edge fray resistance <span>88%</span></label><div class="bar" style="--w:88%"><i></i></div></div></article>
    <article class="sk rv" style="--n:1"><div><h3>Fabric durability</h3><p>Colour, shrinkage and abrasion checked across repeated industrial washes.</p><a class="pill o" href="#preview">See the line-up</a></div>
      <div class="vis"><label>Colour after 40 washes <span>94%</span></label><div class="bar" style="--w:94%"><i></i></div><label>Shrinkage control <span>97%</span></label><div class="bar" style="--w:97%"><i></i></div><label>Abrasion resistance <span>90%</span></label><div class="bar" style="--w:90%"><i></i></div></div></article>
    <article class="sk rv" style="--n:2"><div><h3>Fit &amp; sizing</h3><p>Full size runs, XS to 3XL, so every crew member gets the right fit.</p><a class="pill o" data-open="quote" href="#">Ask for a size chart</a></div>
      <div class="vis"><div class="sizes" id="sizes"><button>XS</button><button>S</button><button class="on">M</button><button>L</button><button>XL</button><button>2XL</button><button>3XL</button></div><p id="sizeOut" style="margin:0">Size M · chest 38–40 in</p></div></article>
    <article class="sk rv" style="--n:3"><div><h3>Your name, your crest</h3><p>Embroidered names, ship logos and company patches, applied cleanly.</p><button class="pill o" data-open="quote">Request custom branding</button></div>
      <div class="vis"><div class="tagp"><i class="fa-solid fa-anchor"></i><span id="tagOut">YOUR NAME</span></div><input id="tagIn" maxlength="14" placeholder="Type a name to preview the embroidery"></div></article>
  </div>
</section>

<section id="preview">
  <div class="lbl rv">[ Preview the line-up ]</div>
  <h2 class="rv">Built for the sea, the kitchen<br>and the shop floor.</h2>
  <p class="sub rv">A taste of 54+ items. Add favourites to your cart, then request the full catalog and bulk pricing.</p>
  <div class="pgrid" id="pgrid"></div>
</section>

<section class="support" id="support">
  <div class="lbl rv">[ Support ]</div>
  <h2 class="rv">Instant quotes, zero hassle.</h2>
  <p class="sub rv">Tell us what your crew needs. We reply fast, with samples and bulk pricing.</p>
  <div class="chat" id="chat">
    <div class="msg me">Hi! I need 150 coveralls with embroidered names.</div>
    <div class="msg">Of course! Sending a sample set and bulk pricing today.</div>
    <div class="msg me">Great. Can you deliver before Dec 5?</div>
    <div class="dots" id="dots"><i></i><i></i><i></i></div>
    <div class="msg">Booked. Your batch is on the production schedule.</div>
  </div>
</section>

<section id="contact"><div class="cta-box rv">
  <div class="lbl">[ Ready to order? ]</div><h2>Take the next step.</h2><p class="sub" style="margin-inline:auto">Outfit your team, start to finish.</p>
  <button class="pill" data-open="quote">Get a free quote</button><a class="pill o" href="mailto:hello@example.com">Email us</a>
</div></section>

<footer id="site-footer">
  <div class="fgrid">
    <div class="fbrand"><img src="assets/logo.png" alt="CSSP logo">CSSP</div>
    <div><h4>Navigation</h4><a href="#story">Story</a><a href="#craft">Craft</a><a href="#preview">Products</a></div>
    <div><h4>Connect</h4><a href="#">Facebook</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
    <div><h4>Contact</h4><a href="tel:+639000000000">+63 900 000 0000</a><a href="mailto:hello@example.com">hello@example.com</a><a href="#support">Support</a></div>
  </div>
  <div class="legal"><span>© 2026 CSSP Garments Trading</span><span>Privacy · Terms</span></div>
</footer>

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

<aside class="drawer" id="drawer" aria-label="Cart"><h3>Your cart</h3><div id="cartList"></div><div class="tot"><span>Total</span><span id="cartTot"></span></div><button class="pill" data-open="quote">Request a Quote</button><button class="pill o" data-close style="margin-top:8px">Close</button></aside>
<div class="ov" id="quote"><form class="box" novalidate><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button><h3>Request a quote</h3>
  <label>Name</label><input name="name" required><div class="err"></div><label>Email</label><input name="email" type="email" required><div class="err"></div>
  <label>Product type</label><select name="type"><option>Coveralls &amp; uniforms</option><option>Chef &amp; kitchen</option><option>Jackets &amp; rainwear</option><option>Safety footwear</option><option>PPE</option><option>Seafarer essentials</option></select>
  <label>Quantity</label><input name="qty" type="number" min="1" required><div class="err"></div><label>Message</label><textarea name="msg" rows="3"></textarea><button class="pill">Send request</button></form></div>
<div class="ov" id="account"><form class="box" novalidate><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
  <div class="tabs"><button type="button" class="on" data-tab="in">Log in</button><button type="button" data-tab="up">Create account</button></div>
  <div id="nameRow" hidden><label>Full name</label><input name="name"><div class="err"></div></div><label>Email</label><input name="email" type="email" required><div class="err"></div>
  <label>Password</label><input name="pw" type="password" minlength="6" required><div class="err"></div><button class="pill" id="acctGo">Log in</button></form></div>
<div class="ov sov" id="search"><div class="box"><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button><h3>Search products</h3><input id="q" placeholder="Coverall, boots, helmet..." autocomplete="off"><div class="sr" id="sr"></div></div></div>
<script src="./js files/script.js"></script>
</body>
</html>