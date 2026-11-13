<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>CSSP Garments Trading</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="./style.css">
<link rel="stylesheet" href="./brand.css">
<link rel="stylesheet" href="./theme.css">
</head>
<body>
<div class="prog" id="prog"></div>
<!-- IMAGE SLOTS: replace src of each <img data-slot="..."> and assets/hero.mp4 (hero video). Slots: fabric-photo-1, warehouse-garments-photo-2, customer-photo-3, product-photo-4, product-photo-5, product-photo-6, product-photo-7, product-photo-8, statement-a, statement-b, owners-photo --><header class="hero" id="top">
  <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="assets/placeholder.svg"><source src="assets/bgvideo.mp4" type="video/mp4"></video>
  <div class="hero-fx" aria-hidden="true"></div>
  <nav class="nav" id="nav" aria-label="Main">
    <a class="brand" href="#top" aria-label="CSSP home">CSSP</a>
    <ul class="menu" id="menu">
      <li class="dd"><button class="ddb" aria-expanded="false" aria-haspopup="true">Products <i class="fa-solid fa-chevron-down"></i></button>
        <div class="panel mega">
          <div class="col"><h4>Uniforms</h4><div class="thumb t1"><i class="fa-solid fa-user-tie"></i></div><p>Maritime &amp; Culinary Uniforms</p><a class="pill nv" href="#collection" data-cat="Coveralls &amp; Uniforms">Gear Up</a></div>
          <div class="col"><h4>Safety Footwear</h4><div class="thumb t2"><i class="fa-solid fa-shoe-prints"></i></div><p>Steel-toe Safety Shoe</p><a class="pill nv" href="#collection" data-cat="Safety Footwear">Secure Step</a></div>
        </div></li>
      <li class="dd"><button class="ddb" aria-expanded="false" aria-haspopup="true">About Us <i class="fa-solid fa-chevron-down"></i></button>
        <div class="panel cols">
          <div class="col"><h4>Company</h4><a href="#story"><i class="fa-solid fa-anchor"></i>Our Story</a><a href="#lines"><i class="fa-solid fa-people-group"></i>Our Team</a><a href="#contact"><i class="fa-solid fa-house"></i>Location</a></div>
          <div class="col"><h4>Support</h4><a href="#orders"><i class="fa-solid fa-circle-question"></i>FAQ</a><a href="#contact"><i class="fa-solid fa-envelope"></i>Contact Us</a><a href="#site-footer"><i class="fa-solid fa-file-lines"></i>Policies</a></div>
        </div></li>
    <li class="only-m"><button class="ddb" data-open="account"><span><i class="fa-solid fa-circle-user"></i>&nbsp; Account</span></button></li>
      <li class="only-m"><button class="ddb" data-open="search"><span><i class="fa-solid fa-magnifying-glass"></i>&nbsp; Search</span></button></li>
    </ul>
    <div class="ctl">
      <div class="dd"><button class="cur" aria-expanded="false" aria-label="Currency"><i class="fa-solid fa-coins"></i><span id="curCode">PHP</span><i class="fa-solid fa-chevron-down"></i></button>
        <div class="panel curp"><button data-cur="PHP">₱ PHP</button><button data-cur="USD">$ USD</button><button data-cur="EUR">€ EUR</button></div></div>
      <button class="ib" id="cartBtn" aria-label="Open cart"><i class="fa-solid fa-cart-shopping"></i><span class="badge-c" id="cartCount">0</span></button>
      <button class="ib sr-m" id="searchBtn" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button class="ib" id="acct" aria-label="Account"><i class="fa-solid fa-circle-user"></i></button>
      <button class="ib" id="tg" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
      <button class="pill g" data-open="quote">Get a Quote</button>
      <button class="ib burger" id="burger" aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
    </div>
  </nav>
  <div class="hr"><button class="pill g" data-open="quote">Get a Quote</button><br>Quality garments, bulk orders and custom uniforms for schools, companies and teams.</div>
  <div class="fab"><span>Spring Collection</span><div class="ph" data-p="fabric photo"><img class="slot" src="assets/placeholder.svg" alt="" data-slot="fabric-photo-1"></div><span>New Arrivals</span></div>
  <div class="wm"><img src="assets/logo.png" alt="CSSP logo"><h1 aria-label="CSSP"><span>C</span><span>S</span><span>S</span><span>P</span></h1></div>
  <!--<div class="owner ph" data-p="owners-photo"><img class="slot" src="assets/placeholder.svg" alt="The people behind CSSP" data-slot="owners-photo"></div>-->
  <a class="explore" href="#story"><span>Scroll to explore</span><i class="mouse"><b></b></i></a>
</header>

<div class="mq" aria-hidden="true"><div>God is good all the time<em>●</em>Bulk orders. Fair prices.<em>●</em>Uniforms &amp; corporate wear<em>●</em>Est. 2023<em>●</em>God is good all the time<em>●</em>Bulk orders. Fair prices.<em>●</em>Uniforms &amp; corporate wear<em>●</em>Est. 2023<em>●</em></div>
<div class="tk" aria-hidden="true"><div class="row"><span><i class="fa-solid fa-anchor"></i>Maritime Coveralls</span><span><i class="fa-solid fa-utensils"></i>Chef Uniforms</span><span><i class="fa-solid fa-shoe-prints"></i>Steel-toe Shoes</span><span><i class="fa-solid fa-helmet-safety"></i>Safety Helmets</span><span><i class="fa-solid fa-life-ring"></i>Life Jackets</span><span><i class="fa-solid fa-wind"></i>Winter Jackets</span><span><i class="fa-solid fa-hand"></i>Work Gloves</span><span><i class="fa-solid fa-ship"></i>Seafarer Essentials</span><span><i class="fa-solid fa-glasses"></i>Eye Protection</span><span><i class="fa-solid fa-anchor"></i>Maritime Coveralls</span><span><i class="fa-solid fa-utensils"></i>Chef Uniforms</span><span><i class="fa-solid fa-shoe-prints"></i>Steel-toe Shoes</span><span><i class="fa-solid fa-helmet-safety"></i>Safety Helmets</span><span><i class="fa-solid fa-life-ring"></i>Life Jackets</span><span><i class="fa-solid fa-wind"></i>Winter Jackets</span><span><i class="fa-solid fa-hand"></i>Work Gloves</span><span><i class="fa-solid fa-ship"></i>Seafarer Essentials</span><span><i class="fa-solid fa-glasses"></i>Eye Protection</span></div><div class="row rev"><span><i class="fa-solid fa-anchor"></i>Maritime Coveralls</span><span><i class="fa-solid fa-utensils"></i>Chef Uniforms</span><span><i class="fa-solid fa-shoe-prints"></i>Steel-toe Shoes</span><span><i class="fa-solid fa-helmet-safety"></i>Safety Helmets</span><span><i class="fa-solid fa-life-ring"></i>Life Jackets</span><span><i class="fa-solid fa-wind"></i>Winter Jackets</span><span><i class="fa-solid fa-hand"></i>Work Gloves</span><span><i class="fa-solid fa-ship"></i>Seafarer Essentials</span><span><i class="fa-solid fa-glasses"></i>Eye Protection</span><span><i class="fa-solid fa-anchor"></i>Maritime Coveralls</span><span><i class="fa-solid fa-utensils"></i>Chef Uniforms</span><span><i class="fa-solid fa-shoe-prints"></i>Steel-toe Shoes</span><span><i class="fa-solid fa-helmet-safety"></i>Safety Helmets</span><span><i class="fa-solid fa-life-ring"></i>Life Jackets</span><span><i class="fa-solid fa-wind"></i>Winter Jackets</span><span><i class="fa-solid fa-hand"></i>Work Gloves</span><span><i class="fa-solid fa-ship"></i>Seafarer Essentials</span><span><i class="fa-solid fa-glasses"></i>Eye Protection</span></div></div>
</div>

<section class="st" id="story">
  <div class="lbl">[ Garments, done right ]</div>
  <p>We’re dressing teams <span class="in ph" data-p="statement-a"><img class="slot" src="assets/placeholder.svg" alt="" data-slot="statement-a"></span> across schools, offices, <span class="faces"><b></b><b></b><b></b><b></b></span> workshops and <span class="in ph" data-p="statement-b"><img class="slot" src="assets/placeholder.svg" alt="" data-slot="statement-b"></span> every size.</p>
  <span class="badge">Est. 2023</span><small class="lbl">Trusted garments. Honest trading.</small>
</section>

<section class="feat" id="why">
  <div class="lbl">[ Why CSSP ]</div>
  <h2>Built for the sea, the kitchen<br>and the shop floor.</h2>
  <div class="fgrid">
    <div class="fc"><i class="fa-solid fa-shield-halved"></i><h3>Tough fabrics</h3><p>Coveralls and jackets made to survive salt, heat and daily wash.</p></div>
    <div class="fc"><i class="fa-solid fa-boxes-stacked"></i><h3>Bulk-ready</h3><p>Full size runs and repeat orders for crews, kitchens and schools.</p></div>
    <div class="fc"><i class="fa-solid fa-pen-ruler"></i><h3>Custom branding</h3><p>Embroidered names, patches and ship or company logos.</p></div>
    <div class="fc"><i class="fa-solid fa-truck-fast"></i><h3>Scheduled delivery</h3><p>Batches timed to your sailing, hiring or school calendar.</p></div>
  </div>
  <div class="nums"><div><b data-count="54" data-suf="+">0</b><span>products</span></div><div><b data-count="7">0</b><span>categories</span></div><div><b data-count="2023">0</b><span>established</span></div></div>
</section>

<section id="orders">
  <div class="top2">
    <div><h2>There’s always<br>an order open.</h2><p style="color:var(--muted);max-width:380px">Plan your bulk orders around our production windows. Samples first, then delivery to the address you choose.</p><a class="pill w" href="#contact">See full calendar</a></div>
    <div class="ph" data-p="warehouse / garments photo"><img class="slot" src="assets/placeholder.svg" alt="" data-slot="warehouse-garments-photo-2"><i>Next batch · slots open</i></div>
  </div>
  <div class="cal-h"><span style="color:var(--text);font-size:18px">What’s happening this fortnight</span><span class="lbl">[ Nov 16 – Nov 29 ]</span></div>
  <div class="cal">
    <div class="cd"><div class="d"><div>16<small>MON</small></div></div><div><b>Sample dispatch</b><span>9:00 AM · Production</span></div><div class="p">+</div></div>
    <div class="cd"><div class="d"><div>19<small>THU</small></div></div><div><b>Order cut-off</b><span>5:00 PM · Orders</span></div><div class="p">+</div></div>
    <div class="cd on"><div class="d"><div>23<small>MON</small></div></div><div><b>Stock restock</b><span>All day · Warehouse</span></div><div class="p">+</div></div>
    <div class="cd"><div class="d"><div>27<small>FRI</small></div></div><div><b>Customer delivery</b><span>Batch run · Shipping</span></div><div class="p">+</div></div>
  </div>
</section>

<section id="lines">
  <div class="split">
    <div class="ph" data-p="customer photo"><img class="slot" src="assets/placeholder.svg" alt="" data-slot="customer-photo-3"><div class="glass"><b>Client Name</b><br>“Placeholder testimonial: consistent sizing, clean finishing and orders that arrive when promised.”</div></div>
    <div class="dp">
      <div class="lbl">[ Choose your line ]</div>
      <h2>Every team wears<span>something different.</span></h2>
      <div class="dl" id="dl">
        <button class="on">School Uniforms</button><p>Durable shirts, blouses, skirts and trousers in full size runs for every grade.</p>
        <button>Corporate Wear</button><p>Polos, office shirts and blazers that keep your whole staff looking the same, sharp.</p>
        <button>Workwear</button><p>Tough, breathable garments for shops, kitchens, warehouses and the field.</p>
        <button>Team &amp; Events</button><p>Printed tees, jerseys and caps for sports, churches and community groups.</p>
      </div>
      <div class="ft"><span>Not sure what you need? <a href="#contact" style="color:var(--lime)">Talk to us</a></span><a class="pill w" href="#collection">View Products</a></div>
    </div>
  </div>
</section>

<div class="wave" aria-hidden="true"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="currentColor"/></svg></div>
<section class="sv deep" id="services"><div>
  <div class="top"><span>Garments for<br>every purpose</span><span style="text-align:right">Made to last<br>wash after wash</span></div>
  <div class="main">
    <div><div class="lbl">[ What we do ]</div><div class="num" id="num">01</div></div>
    <div class="sl" id="sl">
      <button class="on" data-n="01">Bulk Trading<sup>21</sup></button>
      <div class="det on"><div class="tags"><span>Wholesale</span><span>Fair pricing</span></div><p>Large-volume garments sourced and supplied at honest prices.</p></div>
      <button data-n="02">Custom Printing<sup>16</sup></button>
      <div class="det"><div class="tags"><span>Embroidery</span><span>Screen print</span></div><p>Your logo, name or crest applied cleanly and built to last.</p></div>
      <button data-n="03">Sizing &amp; Fitting<sup>32</sup></button>
      <div class="det"><div class="tags"><span>Size charts</span><span>All body types</span></div><p>Measurements and fittings so every wearer gets the right fit.</p></div>
      <button data-n="04">Delivery &amp; Restock<sup>12</sup></button>
      <div class="det"><div class="tags"><span>Scheduled</span><span>Repeat orders</span></div><p>Batches timed to your school year, hiring or event calendar.</p></div>
    </div>
  </div>
  <div class="stats">000+ <b>garments supplied</b><br>00+ <b>happy clients</b><br>Est. <b>2023</b><br><a class="pill g" href="#contact" style="margin-top:14px">Request a Quote</a></div>
</div></section>

<section id="collection">
  <div class="rg-h"><div><div class="lbl">[ The collection ]</div><h2>54+ products.<br>One crew-ready catalog.</h2></div><div><p>Pick by purpose, mix by size, brand it your way.</p><a class="pill w" href="#contact">Order samples</a></div></div>
  <div class="cat-bar" id="catBar"></div>
  <p class="lbl" id="catCount" style="margin-bottom:14px"></p>
  <div class="cgrid" id="catGrid"></div>
  <button class="pill w more" id="catMore">Load more products</button>
</section>

<div class="wave" aria-hidden="true"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="currentColor"/></svg></div>
<section class="cta deep" id="contact">
  <img src="assets/logo.png" alt="CSSP logo">
  <div class="lbl">[ Ready to order? ]</div>
  <h2>Outfit your team, start to finish.</h2>
  <a class="pill g" href="mailto:hello@example.com">Get a free quote</a>
</section>
<div class="deep" id="site-footer"><div class="fo"><span>2026 · CSSP Garments Trading</span><span>hello@example.com · +63 900 000 0000</span></div>
<div class="fw" aria-hidden="true"><img src="assets/logo.png" alt="CSSP logo"><h1><span>C</span><span>S</span><span>S</span><span>P</span></h1></div></div>
<div class="fabs">
  <button class="fb" id="toTop" aria-label="Back to top"><i class="fa-solid fa-chevron-up"></i></button>
  <div class="fm" id="fm">
    <div class="fm-list">
      <a class="fb sub" data-info="call" href="tel:+639000000000" aria-label="Call us" style="--k:2"><i class="fa-solid fa-phone"></i></a>
      <a class="fb sub" data-info="msg" href="mailto:hello@example.com" aria-label="Message us" style="--k:1"><i class="fa-solid fa-envelope"></i></a>
      <button class="fb sub" data-info="share" aria-label="Share link" style="--k:0"><i class="fa-solid fa-share-nodes"></i></button>
    </div>
    <button class="fb main" id="fmMain" aria-expanded="false" aria-label="Contact options"><i class="fa-solid fa-plus"></i></button>
  </div>
</div>
<div class="finfo" id="finfo" aria-live="polite"><b></b><span></span><a href="#"></a></div>
<aside class="drawer" id="drawer" aria-label="Cart"><h3>Your cart</h3><div id="cartList"></div><div class="tot"><span>Total</span><span id="cartTot"></span></div><button class="pill g" data-open="quote">Request a Quote</button><button class="pill" data-close style="margin-top:8px">Close</button></aside>
<div class="ov" id="quote"><form class="box" novalidate><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button><h3>Request a quote</h3>
<label>Name</label><input name="name" required><div class="err"></div><label>Email</label><input name="email" type="email" required><div class="err"></div>
<label>Product type</label><select name="type"><option>Uniforms</option><option>Safety footwear</option><option>Corporate wear</option><option>Team &amp; events</option></select>
<label>Quantity</label><input name="qty" type="number" min="1" required><div class="err"></div><label>Message</label><textarea name="msg" rows="3"></textarea>
<button class="pill g">Send request</button></form></div>
<div class="ov" id="account"><form class="box" novalidate><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
<div class="tabs"><button type="button" class="on" data-tab="in">Log in</button><button type="button" data-tab="up">Create account</button></div>
<div id="nameRow" hidden><label>Full name</label><input name="name"><div class="err"></div></div><label>Email</label><input name="email" type="email" required><div class="err"></div>
<label>Password</label><input name="pw" type="password" minlength="6" required><div class="err"></div><button class="pill g" id="acctGo">Log in</button></form></div>
<div class="ov sov" id="search"><div class="box"><button type="button" class="ib x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button><h3>Search products</h3><input id="q" placeholder="Polo, uniform, pants..." autocomplete="off"><div class="sr" id="sr"></div></div></div>
<script src="script.js"></script>
<script src="catalog.js"></script>
</body>
</html>