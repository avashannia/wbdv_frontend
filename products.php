<!DOCTYPE html>
<html lang="en" data-theme="light"> 
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSSP Garments Trading</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="icon" type="image/x-icon" href="./assets/logo.png">
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

        <link rel="preconnect" href="https://googleapis.com">
        <link rel="preconnect" href="https://gstatic.com" crossorigin>
        <link href="https://googleapis.com/css2?family=Six+Caps&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="./css files/products_style.css?v=2">
        <link rel="stylesheet" href="./css files/style.css?v=2">

        <!-- ===== FontAwesome for icons ===== -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
    
        <script src="https://kit.fontawesome.com/493ae0299a.js" crossorigin="anonymous"></script>
        
    </head>
    <body>
    
        <!-- ===== HEADER / NAVIGATION ===== -->
        <div class="prog" id="prog">
            <nav class="nav" id="nav" aria-label="Main">
                <a class="brand" href="#top" aria-label="CSSP home"><img src="assets/logo.png" alt="">CSSP</a>
                <ul class="menu" id="menu">
                    <li class="dd">
                        <button class="ddb" aria-expanded="false">Products <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="panel mega">
                            <div class="col">
                                <h4>Uniforms</h4>
                                <div class="thumb"><i class="fa-solid fa-user-tie"></i></div>
                                <p>Maritime &amp; Culinary Uniforms</p>
                                <a class="pill" href="./trial.php">Gear Up</a>
                            </div>
                            <div class="col">
                                <h4>Safety Footwear</h4>
                                <div class="thumb"><i class="fa-solid fa-shoe-prints"></i></div>
                                <p>Steel-toe Safety Shoe</p>
                                <a class="pill" href="#preview">Secure Step</a>
                            </div>
                        </div>
                    </li>
                    <li class="dd">
                        <button class="ddb" aria-expanded="false">About Us <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="panel cols">
                            <div class="col">
                                <h4>Company</h4>
                                <a href="#story"><i class="fa-solid fa-anchor"></i>Our Story</a>
                                <a href="#craft"><i class="fa-solid fa-people-group"></i>Our Craft</a>
                                <a href="#contact"><i class="fa-solid fa-house"></i>Location</a>
                            </div>
                            <div class="col">
                                <h4>Support</h4>
                                <a href="#support"><i class="fa-solid fa-circle-question"></i>FAQ</a>
                                <a href="#contact"><i class="fa-solid fa-envelope"></i>Contact Us</a>
                                <a href="#site-footer"><i class="fa-solid fa-file-lines"></i>Policies</a>
                            </div>
                        </div>
                    </li>
                    <li class="only-m"><button class="ddb" data-open="account"><span><i class="fa-solid fa-circle-user"></i>&nbsp; Account</span></button></li>
                    <li class="only-m"><button class="ddb" data-open="search"><span><i class="fa-solid fa-magnifying-glass"></i>&nbsp; Search</span></button></li>
                </ul>
                <div class="ctl">
                    <div class="dd">
                        <button class="cur" aria-expanded="false" aria-label="Currency">
                            <i class="fa-solid fa-coins"></i><span id="curCode">PHP</span><i class="fa-solid fa-chevron-down"></i>
                        </button>
                
                        <div class="panel curp">
                            <button data-cur="PHP">₱ PHP</button>
                            <button data-cur="USD">$ USD</button>
                            <button data-cur="EUR">€ EUR</button>
                        </div>
                    </div>
                    <button class="ib" id="cartBtn" aria-label="Open cart"><i class="fa-solid fa-cart-shopping"></i><span class="badge-c" id="cartCount">0</span></button>
                    <button class="ib" id="searchBtn" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button class="ib" id="acct" data-open="account" aria-label="Account"><i class="fa-solid fa-circle-user"></i></button>
                    <button class="ib" id="tg" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
                    <button class="pill" data-open="quote">Get a Quote</button>
                    <button class="ib burger" id="burger" aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
                </div>
            </nav>
        </div>

        <!-- ===== HERO SECTION ===== -->
        <section class="hero-product">
            <div class="hero-content">
                <span class="hero-label-product">TESTED BY THE OCEAN</span>
                <h1 class="hero-title hero-cutout-text">
                Chosen for <span>Excellence</span>
                </h1>
                <p class="hero-desc-product">
                Choose gear that works as hard as you do. Our seaman clothing is carefully crafted to deliver unmatched comfort, lasting durability, and reliable performance because at sea, every detail matters.
                </p>
            </div>
        </section>

        <!-- ===== PRODUCTS ===== -->
        <section class="products" id="uniforms">
            <div class="section-header-product">
                <span class="section-sub-product">Maritime & Culinary</span>
                <h2 class="section-title-product">Uniforms</h2>
            </div>

            <div class="product-grid-product">
                <div class="product-card" 
                    data-type="Uniforms"
                    data-name="Coveralls (Royal Blue)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR1-Front-Coverall (Blue).png"
                    data-back="Assets/Products/UNI-PR1-Back-Coverall (Blue).png"
                    data-price="1000.00"
                    data-material="100% Cotton Twill, Reflectorized Tape">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR1-Front-Coverall (Blue).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR1-Back-Coverall (Blue).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag bestseller">Bestseller</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Maritime</span>
                        <h3 class="card-name">Coveralls (Royal Blue)</h3>
                        <div class="card-price" data-base="1000.00">₱1,000.00</div>
                        <!-- <div class="rating">★★★★★ <span>(137)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card" 
                    data-type="Uniforms"
                    data-name="Coveralls (Orange)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR2-Front-Coverall (Orange).png"
                    data-back="Assets/Products/UNI-PR2-Back-Coverall (Orange).png"
                    data-price="1000.00"
                    data-material="100% Cotton Twill, Reflectorized Tape">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR2-Front-Coverall (Orange).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR2-Back-Coverall (Orange).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Maritime</span>
                        <h3 class="card-name">Coveralls (Orange)</h3>
                        <div class="card-price" data-base="1000.00">₱1,000.00</div>
                        <!-- <div class="rating">★★★★★ <span>(866)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Coveralls (Khaki)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Coverall.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR3-Front-Coverall (Khaki).png"
                    data-back="Assets/Products/UNI-PR3-Back-Coverall (Khaki).png"
                    data-price="1000.00"
                    data-material="100% Cotton Twill, Reflectorized Tape">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR3-Front-Coverall (Khaki).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR3-Back-Coverall (Khaki).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag sale">Sale</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Maritime</span>
                        <h3 class="card-name">Coveralls (Khaki)</h3>
                        <div class="card-price" data-base="1000.00">₱1,000.00</div>
                        <!-- <div class="rating">★★★★★ <span>(39)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Chef's Polo Long Sleeve (Ver. 1)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Top (Long Sleeve).png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR4-Front-Top1.png"
                    data-back="Assets/Products/UNI-PR4-Back-Top1.png"
                    data-price="800.00"
                    data-material="Poly-Cotton Blend, Breathable Fabric">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR4-Front-Top1.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR4-Back-Top1.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Kitchen</span>
                        <h3 class="card-name">Chef's Polo Long Sleeve (Ver. 1)</h3>
                        <div class="card-price" data-base="800.00">₱800.00</div>
                        <!-- <div class="rating">★★★★★ <span>(214)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Chef's Polo Long Sleeve (Ver. 2)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Top (Long Sleeve).png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR5-Front-Top2.png"
                    data-back="Assets/Products/UNI-PR5-Back-Top2.png"
                    data-price="950.00"
                    data-material="100% Cotton Twill, Breathable Fabric">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR5-Front-Top2.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR5-Back-Top2.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Kitchen</span>
                        <h3 class="card-name">Chef's Polo Long Sleeve (Ver. 2)</h3>
                        <div class="card-price" data-base="950.00">₱950.00</div>
                        <!-- <div class="rating">★★★★★ <span>(79)</span></div> -->
                         <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Kitchen Crew Polo"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Top (Short Sleeve).png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR6-Front-Top3.png"
                    data-back="Assets/Products/UNI-PR6-Back-Top3.png"
                    data-price="800.00"
                    data-material="Poly-Cotton Blend, Breathable Fabric">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR6-Front-Top3.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR6-Back-Top3.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag bestseller">Bestseller</span>
                        </div>
                       
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Kitchen</span>
                        <h3 class="card-name">Kitchen Crew Polo</h3>
                        <div class="card-price" data-base="800.00">₱800.00</div>
                        <!-- <div class="rating">★★★★★ <span>(218)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Chef's Pants"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Pants.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR7-Front-Pants1.png"
                    data-back="Assets/Products/UNI-PR7-Back-Pants1.png"
                    data-price="500.00"
                    data-material="Poly-Cotton Blend, Breathable Fabric">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR7-Front-Pants1.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR7-Back-Pants1.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag sale">Sale</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Kitchen</span>
                        <h3 class="card-name">Chef's Pants</h3>
                        <div class="card-price" data-base="500.00">₱500.00</div>
                        <!-- <div class="rating">★★★★★ <span>(88)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Kitchen Crew Checkered Pants"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Pants.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR8-Front-Pants2.png"
                    data-back="Assets/Products/UNI-PR8-Back-Pants2.png"
                    data-price="500.00"
                    data-material="Poly-Cotton Blend, Breathable Fabric">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR8-Front-Pants2.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR8-Back-Pants2.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag bestseller">Bestseller</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Kitchen</span>
                        <h3 class="card-name">Kitchen Crew Checkered Pants</h3>
                        <div class="card-price" data-base="500.00">₱500.00</div>
                        <!-- <div class="rating">★★★★★ <span>(88)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Winter Jacket"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Jackets.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR9-Front-Jacket1.png"
                    data-back="Assets/Products/UNI-PR9-Back-Jacket1.png"
                    data-price="1500.00"
                    data-material="Polyester Outer Shell, Reflectorized Tape">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR9-Front-Jacket1.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR9-Back-Jacket1.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Jackets</span>
                        <h3 class="card-name">Winter Jacket</h3>
                        <div class="card-price" data-base="1500.00">₱1,500.00</div>
                        <!-- <div class="rating">★★★★★ <span>(305)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Uniforms"
                    data-name="Ordinary Jacket"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Jackets.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Uniforms.png"
                    data-front="Assets/Products/UNI-PR10-Front-Jacket2.png"
                    data-back="Assets/Products/UNI-PR10-Back-Jacket2.png"
                    data-price="1500.00"
                    data-material="Polyester Outer Shell, Reflectorized Tape">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/UNI-PR10-Front-Jacket2.png" class="img-front" alt="Front View">
                        <img src="Assets/Products/UNI-PR10-Back-Jacket2.png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">Uniforms - Jackets</span>
                        <h3 class="card-name">Ordinary Jacket</h3>
                        <div class="card-price" data-base="1500.00">₱1,500.00</div>
                        <!-- <div class="rating">★★★★★ <span>(305)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 
            </div> 
        </section>

        <section class="products" id="safety-footwears">
            <div class="section-header-product">
                <span class="section-sub-product">Personal Protective Equipment</span>
                <h2 class="section-title-product">Safety Footwear</h2>
            </div>

            <div class="product-grid-product">
                <div class="product-card"
                    data-type="Shoes"
                    data-name="MG Safety (High Cut)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Shoes.png"
                    data-front="Assets/Products/SHO-PR1-Front-High Cut (MG Safety).png"
                    data-back="Assets/Products/SHO-PR1-Back-High Cut (MG Safety).png"
                    data-price="1500.00"
                    data-material="Full-grain Leather, Carbon Steel Toe Cap">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/SHO-PR1-Front-High Cut (MG Safety).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/SHO-PR1-Back-High Cut (MG Safety).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag bestseller">Bestseller</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">PPE - Shoes</span>
                        <h3 class="card-name">MG Safety (High Cut)</h3>
                        <div class="card-price" data-base="1500.00">₱1,500.00</div>
                        <!-- <div class="rating">★★★★★ <span>(125)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Shoes"
                    data-name="Rockwinner (Low Cut)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Shoes.png"
                    data-front="Assets/Products/SHO-PR2-Front-Low Cut (Rockwinner).png"
                    data-back="Assets/Products/SHO-PR2-Back-Low Cut (Rockwinner).png"
                    data-price="1200.00"
                    data-material="Full-grain Leather, Carbon Steel Toe Cap">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/SHO-PR2-Front-Low Cut (Rockwinner).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/SHO-PR2-Back-Low Cut (Rockwinner).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag new">New</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">PPE - Shoes</span>
                        <h3 class="card-name">Rockwinner (Low Cut)</h3>
                        <div class="card-price" data-base="1200.00">₱1,200.00</div>
                        <!-- <div class="rating">★★★★★ <span>(55)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 

                <div class="product-card"
                    data-type="Shoes"
                    data-name="MG Safety (Low Cut)"
                    data-extra1="Assets/Products/Modal/SizeGuide-Front and Back-Shoes.png"
                    data-extra2="Assets/Products/Modal/SizeGuide-Measurements-Shoes.png"
                    data-front="Assets/Products/SHO-PR3-Front-Low Cut (MG Safety).png"
                    data-back="Assets/Products/SHO-PR3-Back-Low Cut (MG Safety).png"
                    data-price="1200.00"
                    data-material="Full-grain Leather, Carbon Steel Toe Cap">

                    <div class="card-image-wrap"> 
                        <img src="Assets/Products/SHO-PR3-Front-Low Cut (MG Safety).png" class="img-front" alt="Front View">
                        <img src="Assets/Products/SHO-PR3-Back-Low Cut (MG Safety).png" class="img-back" alt="Back View">
                        <div class="card-badges">
                            <span class="badge-tag sale">Sale</span>
                        </div>
                        
                    </div>
                    <div class="card-info">
                        <span class="card-category">PPE - Shoes</span>
                        <h3 class="card-name">MG Safety (Low Cut)</h3>
                        <div class="card-price" data-base="1200.00">₱1,200.00</div>
                        <!-- <div class="rating">★★★★★ <span>(278)</span></div> -->
                        <div class="card-desc"><i class="fa-solid fa-circle-check"></i>  Stock Available</div>
                        
                        <button class="size-select add-to-cart-btn" onclick="openCartModal(this)">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div> 
            </div> 
        </section>

        <!-- ===== FOOTER ===== -->
        <footer id="site-footer">
            <div class="wave" aria-hidden="true">
                <svg class="wv wv1" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,70 Q300,10 600,70 T1200,70 T1800,70 T2400,70 V120 H0 Z"/></svg>
                <svg class="wv wv2" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,66 Q150,14 300,66 T600,66 T900,66 T1200,66 T1500,66 T1800,66 T2100,66 T2400,66 V120 H0 Z"/></svg>
                <svg class="wv wv3" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="M0,88 Q100,48 200,88 T400,88 T600,88 T800,88 T1000,88 T1200,88 T1400,88 T1600,88 T1800,88 T2000,88 T2200,88 T2400,88 V120 H0 Z"/></svg>
            </div>
            <div class="fgrid">
                <div class="fbrand"><img src="assets/logo.png" alt="CSSP logo">CSSP</div>
                <div>
                    <h4>Navigation</h4><a href="#story">Story</a><a href="#craft">Craft</a><a href="#preview">Products</a>
                </div>
                <div>
                    <h4>Connect</h4><a href="#">Facebook</a><a href="#">Instagram</a><a href="#">LinkedIn</a>
                </div>
                <div>
                    <h4>Contact</h4><a href="tel:+639000000000">+63 900 000 0000</a><a
                    href="mailto:hello@example.com">hello@example.com</a><a href="#support">Support</a>
                </div>
            </div>
            <div class="legal"><span>© 2026 CSSP Garments Trading</span><span>Privacy · Terms</span></div>
            <div class="ftk" aria-hidden="true">
                <div class="trk"><span>Maritime Coveralls <i class="fa-solid fa-anchor"></i></span><span>Chef Uniforms <i
                        class="fa-solid fa-anchor"></i></span><span>Steel-toe Shoes <i
                        class="fa-solid fa-anchor"></i></span><span>Safety Helmets <i
                        class="fa-solid fa-anchor"></i></span><span>Life Jackets <i
                        class="fa-solid fa-anchor"></i></span><span>Winter Jackets <i
                        class="fa-solid fa-anchor"></i></span><span>Work Gloves <i
                        class="fa-solid fa-anchor"></i></span><span>Maritime Coveralls <i
                        class="fa-solid fa-anchor"></i></span><span>Chef Uniforms <i
                        class="fa-solid fa-anchor"></i></span><span>Steel-toe Shoes <i
                        class="fa-solid fa-anchor"></i></span><span>Safety Helmets <i
                        class="fa-solid fa-anchor"></i></span><span>Life Jackets <i
                        class="fa-solid fa-anchor"></i></span><span>Winter Jackets <i
                        class="fa-solid fa-anchor"></i></span><span>Work Gloves <i class="fa-solid fa-anchor"></i></span>
                </div>
            </div>
        </footer>

        <div class="fabs">
            <button class="fb" id="toTop" aria-label="Back to top"><i class="fa-solid fa-chevron-up"></i></button>
            <div class="fm" id="fm">
                <div class="fm-list">
                    <button class="fb" data-info="call" aria-label="Call us" style="--k:2">
                        <i class="fa-solid fa-phone"></i>
                    </button>
                    <button class="fb" data-info="msg" aria-label="Email us" style="--k:1">
                        <i class="fa-solid fa-envelope"></i>
                    </button>
                    <button class="fb" data-info="share" aria-label="Share link" style="--k:0">
                        <i class="fa-solid fa-share-nodes"></i>
                    </button>
                </div>
                <button class="fb main" id="fmMain" aria-expanded="false" aria-label="Contact options">
                    <i class="fa-solid fa-plus"></i>
                </button>
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
                <button type="button" class="ib x" data-close aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h3>Request a quote</h3>
                <label>Name</label><input name="name" required>
                <div class="err"></div><label>Email</label><input name="email" type="email" required>
                <div class="err"></div>

                <label>Product type</label><select name="type">
                    <option>Coveralls &amp; uniforms</option>
                    <option>Chef &amp; kitchen</option>
                    <option>Jackets &amp; rainwear</option>
                    <option>Safety footwear</option>
                    <option>PPE</option>
                    <option>Seafarer essentials</option>
                </select>
                <label>Quantity</label><input name="qty" type="number" min="1" required>
                <div class="err"></div><label>Message</label><textarea name="msg" rows="3"></textarea><button class="pill">Send request</button>
            </form>
        </div>

        <div class="ov" id="account">
            <form class="box" novalidate>
                <button type="button" class="ib x" data-close aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="tabs">
                    <button type="button" class="on" data-tab="in">Log in</button>
                    <button type="button" data-tab="up">Create account</button>
                </div>
                <div id="nameRow" hidden><label>Full name</label><input name="name">
                    <div class="err"></div>
                </div>
                <label>Email</label><input name="email" type="email" required>
                <div class="err"></div>
                <label>Password</label><input name="pw" type="password" minlength="6" required>
                <div class="err"></div>
                <button class="pill" id="acctGo">Log in</button>
            </form>
        </div>
      
        <div class="ov sov" id="search">
            <div class="box">
                <button type="button" class="ib x" data-close aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h3>Search products</h3>
                <input id="q" placeholder="Coverall, boots, helmet..." autocomplete="off">
                <div class="sr" id="sr"></div>
            </div>
        </div>

        <div id="toastContainer"></div>

        <div class="success-modal" id="successModal">
            <div class="success-box">
                <i class="fa-solid fa-circle-check"></i>
                <p>All aboard! Your product has joined your cart.</p>
            </div>
        </div>
    
        <script src="js files/products_script.js"></script>
        <script src="js files/script.js"></script>
        <script src="js files/aboutus_script.js"></script>
            
    </body>
</html>