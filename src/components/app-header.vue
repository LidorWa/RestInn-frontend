<template>
  <section :class="'main-header-container flex flex-columns ' + headerStatus">
    <div class="logo-nav-container flex space-between">
      <div class="logo flex align-center">
        <h1 class="logo-txt">RestInn</h1>
        <i class="fa-brands fa-airbnb"></i>
      </div>
      <div v-if="headerStatus === 'shrinkSearchBar' && !showSearch" @click="toggleShowSearch" class="search">temporary</div>
      <nav class="main-header-nav">
        <router-link to="/">Home</router-link> | <router-link to="/stay">Explore</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </div>
    <div v-if="(showSearch && headerStatus === 'shrinkSearchBar') || headerStatus !== 'shrinkSearchBar'" class="main-search-bar">
      <main-search />
    </div>
    <!-- <div class="_167wsvl">
                      <button type="button" class="_8bn4ek6" aria-expanded="false" aria-label="Main navigation menu. 3 notifications." data-testid="cypress-headernav-profile">
                        <div class="_3hmsj">
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible">
                            <g fill="none" fill-rule="nonzero">
                              <path d="m2 16h28"></path>
                              <path d="m2 24h28"></path>
                              <path d="m2 8h28"></path>
                            </g>
                          </svg>
                        </div>
                        <div class="_1xp7o8n"><img class="_1wzp0xs" src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" /></div>
                        <div class="_1ow8vwmf">3</div>
                      </button>
                    </div> -->

    <!-- <header class="_1wbarlt7">
      <div class="_z5inxef">
        <div class="_otdka">
          <div class="c1yo0219 dir dir-ltr" style="">
            <div style="--gp-section-max-width: 1120px">
              <div data-plugin-in-point-id="EXPLORE_HEADER_LOGO" data-section-id="EXPLORE_HEADER_LOGO">
                <a class="_1mngzf6j" aria-label="Airbnb Homepage" href="/"
                  ><div class="_1grlqto">
                    <svg width="102" height="32" fill="currentcolor" style="display: block">
                      <path
                        d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z"
                      ></path>
                    </svg>
                  </div>
                  <div class="_17ctt5">
                    <svg width="30" height="32" fill="currentcolor" style="display: block">
                      <path
                        d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"
                      ></path>
                    </svg></div
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="_emkzyn">
          <div class="c1yo0219 dir dir-ltr" style="">
            <div style="--gp-section-max-width: 1120px">
              <div data-plugin-in-point-id="EXPLORE_BIG_SEARCH" data-section-id="EXPLORE_BIG_SEARCH">
                <div class="_n3nvl50">
                  <div class="_1xlay30" role="search" data-testid="little-search" aria-labelledby="littleSearchLabel">
                    <button class="_1gdejrc" type="button">
                      <div class="_l6n8jt" id="littleSearchLabel">Start your search</div>
                      <div class="_aazmlg" data-icon="true" data-testid="little-search-icon">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible">
                          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                <div class="_19ls611l">
                  <div data-nosnippet="true">
                    <div class="_x6p8vy">
                      <form class="_1qrufqh" action="/s/all" method="get" role="search">
                        <div class="_1h6yktt">
                          <div role="tablist" aria-label="What can we help you find?" aria-owns="search-block-tab-true-STAYS search-block-tab-true-EXPERIENCES">
                            <div class="_1uml5pzw">
                              <button id="search-block-tab-true-STAYS" data-testid="header-tab-search-block-tab-true-STAYS" name="refinement_paths[]" role="tab" aria-selected="true" aria-controls="search-tabpanel" type="button" class="_4y6znve"><span class="_1ugy8r3">Places to stay</span></button><input type="hidden" name="refinement_paths[]" value="/homes" />
                            </div>
                            <div class="_se3mjtn">
                              <button id="search-block-tab-true-EXPERIENCES" data-testid="header-tab-search-block-tab-true-EXPERIENCES" name="refinement_paths[]" role="tab" aria-selected="false" aria-controls="search-tabpanel" type="button" class="_4y6znve"><span class="_1ugy8r3">Experiences</span></button>
                            </div>
                          </div>
                          <div class="_36rlri">
                            <a href="/s/experiences/online" class="_4y6znve"><div class="_14elohd3">Online Experiences</div></a>
                          </div>
                        </div>
                        <div aria-labelledby="search-block-tab-true-STAYS" id="search-tabpanel" role="tabpanel" tabindex="0" class="_el9cm4a" data-panel-bounds="true">
                          <div class="_13rvbe2">
                            <div class="_dd55nf9">
                              <div class="_1rwlbyy">
                                <label class="_f6t7o5n" for="bigsearch-query-location-input"
                                  ><div class="_16fjzef">
                                    <div class="_snpd7k">Location</div>
                                    <input class="_1yibeas" aria-autocomplete="none" autocomplete="off" autocorrect="off" spellcheck="false" id="bigsearch-query-location-input" name="query" aria-describedby="bigsearch-query-location-description" placeholder="Where are you going?" data-testid="structured-search-input-field-query" value="" /></div></label
                                ><span class="_1u9fru1" id="bigsearch-query-location-description">Navigate forward to access suggested results</span>
                                <div class="_yu5dnq">
                                  <div class="_1fynesg" data-testid="structured-search-input-field-query-panel" style="margin-left: 0px">
                                    <section>
                                      <div class="_3hmsj">
                                        <div class="_1dwtf8sd" role="dialog" aria-label="Search suggestions" id="bigsearch-query-location-listbox" tabindex="-1">
                                          <div class="krm8eud dir dir-ltr">
                                            <div role="group" class="_1s4do1s" aria-labelledby="FLEXIBLE_DESTINATIONS-go-anywhere--anytime">
                                              <div class="_7y50ryo" id="FLEXIBLE_DESTINATIONS-go-anywhere--anytime"><span class="_k5mfsv">Go anywhere, anytime</span></div>
                                              <div>
                                                <div role="link" tabindex="0" id="bigsearch-query-location-suggestion-0" data-index="0" data-testid="option-0" class="_15pbdpi">
                                                  <div class="_1nuqap5">
                                                    <div aria-hidden="true">
                                                      <video autoplay="" crossorigin="anonymous" playsinline="" poster="https://a0.muscache.com/pictures/04c0a34f-9880-48b7-a69c-49011f602a35.jpg" preload="auto" width="28" height="28">
                                                        <source src="https://a0.muscache.com/videos/vopt/13/e1/13e14ffc-822c-5e84-aa58-d6a6527dc218/13e14ffc822c5e84aa58d6a6527dc218.mp4?impolicy=low_quality" type="video/mp4" />
                                                      </video>
                                                    </div>
                                                    <div class="_1825a1k"><div class="_ywgikl">I’m flexible</div></div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div role="group" class="_1s4do1s" aria-labelledby="savedSearches-recent-searches">
                                              <div class="_3hjmhl8" id="savedSearches-recent-searches"><span class="_k5mfsv">Recent Searches</span></div>
                                              <div role="link" tabindex="0" id="bigsearch-query-location-suggestion-1" data-index="1" data-testid="option-1" class="_g4jdzz">
                                                <div class="_6q6msi">
                                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 22px; width: 22px; fill: currentcolor">
                                                    <path
                                                      d="m15.9999.3335c8.6524795 0 15.6667 7.01422051 15.6667 15.6667 0 8.6524795-7.0142205 15.6667-15.6667 15.6667-8.65247949 0-15.6667-7.0142205-15.6667-15.6667 0-8.65247949 7.01422051-15.6667 15.6667-15.6667zm0 2c-7.54790999 0-13.6667 6.11879001-13.6667 13.6667 0 7.54791 6.11879001 13.6667 13.6667 13.6667 7.54791 0 13.6667-6.11879 13.6667-13.6667 0-7.54790999-6.11879-13.6667-13.6667-13.6667zm1.0001 3v10.0895l8.7375978 5.0444733-.9999956 1.7320534-9.7376022-5.6219748v-11.2440519z"
                                                    ></path>
                                                  </svg>
                                                </div>
                                                <div class="_1825a1k"><div class="_4za9uz">Jerusalem · Stays</div></div>
                                              </div>
                                              <div role="link" tabindex="0" id="bigsearch-query-location-suggestion-2" data-index="2" data-testid="option-2" class="_g4jdzz">
                                                <div class="_6q6msi">
                                                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 22px; width: 22px; fill: currentcolor">
                                                    <path
                                                      d="m15.9999.3335c8.6524795 0 15.6667 7.01422051 15.6667 15.6667 0 8.6524795-7.0142205 15.6667-15.6667 15.6667-8.65247949 0-15.6667-7.0142205-15.6667-15.6667 0-8.65247949 7.01422051-15.6667 15.6667-15.6667zm0 2c-7.54790999 0-13.6667 6.11879001-13.6667 13.6667 0 7.54791 6.11879001 13.6667 13.6667 13.6667 7.54791 0 13.6667-6.11879 13.6667-13.6667 0-7.54790999-6.11879-13.6667-13.6667-13.6667zm1.0001 3v10.0895l8.7375978 5.0444733-.9999956 1.7320534-9.7376022-5.6219748v-11.2440519z"
                                                    ></path>
                                                  </svg>
                                                </div>
                                                <div class="_1825a1k"><div class="_4za9uz">Ezor Tel Aviv · Stays</div></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                                <span class="_1czersj" aria-atomic="true" aria-live="polite" role="status"></span>
                              </div>
                            </div>
                            <div class="_ftjuqh"></div>
                            <div class="_kasbqg">
                              <div class="_1ypspju">
                                <div class="_1r2piww3" role="button" tabindex="0" aria-expanded="false" data-testid="structured-search-input-field-split-dates-0">
                                  <div class="_1qqq7vb">
                                    <div class="_snpd7k">Check in</div>
                                    <div class="_suql0c">Add dates</div>
                                  </div>
                                </div>
                              </div>
                              <div class="_ftjuqh"></div>
                              <div class="_1ypspju">
                                <div class="_1r2piww3" role="button" tabindex="0" aria-expanded="false" data-testid="structured-search-input-field-split-dates-1">
                                  <div class="_1qqq7vb">
                                    <div class="_snpd7k">Check out</div>
                                    <div class="_suql0c">Add dates</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="_ftjuqh"></div>
                            <div class="_am7ud2n">
                              <div class="_1f3kvcqz" role="button" tabindex="0" aria-expanded="false" data-testid="structured-search-input-field-guests-button">
                                <div class="_1qqq7vb">
                                  <div class="_snpd7k">Guests</div>
                                  <div class="_suql0c">Add guests</div>
                                </div>
                              </div>
                              <div class="_18zylmz">
                                <button class="_1dbgthhp" type="button">
                                  <span class="_163rr5i"><span class="_m9v25n" style="background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%); --mouse-x: 20.9961; --mouse-y: 8.33333"></span></span
                                  ><span class="_tcp689"
                                    ><div class="_186q534">
                                      <div class="_14lk9e14">
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible">
                                          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
                                        </svg>
                                      </div>
                                      <div class="_vinp6dc">Search</div>
                                    </div></span
                                  >
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="_19h9w7f">
          <div class="c1yo0219 dir dir-ltr" style="">
            <div style="--gp-section-max-width: 1120px">
              <div data-plugin-in-point-id="EXPLORE_HEADER_NAV" data-section-id="EXPLORE_HEADER_NAV">
                <nav class="_vuzcgs" aria-label="Profile">
                  <div class="_176ugpa">
                    <a class="c1jdlqzl cnfwnvw dir dir-ltr" href="/hosting"><div class="l1hgmivi dir dir-ltr">Switch to hosting</div></a>
                    <div class="_1ubw29">
                      <button type="button" class="c1jdlqzl cnfwnvw dir dir-ltr" aria-expanded="false" aria-label="Choose a language and currency">
                        <div class="l1hgmivi dir dir-ltr">
                          <div class="_z5mecy" aria-hidden="true">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 16px; width: 16px; fill: currentcolor">
                              <path
                                d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div class="_3hmsj">
                    <div class="_167wsvl">
                      <button type="button" class="_8bn4ek6" aria-expanded="false" aria-label="Main navigation menu. 3 notifications." data-testid="cypress-headernav-profile">
                        <div class="_3hmsj">
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible">
                            <g fill="none" fill-rule="nonzero">
                              <path d="m2 16h28"></path>
                              <path d="m2 24h28"></path>
                              <path d="m2 8h28"></path>
                            </g>
                          </svg>
                        </div>
                        <div class="_1xp7o8n"><img class="_1wzp0xs" src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" /></div>
                        <div class="_1ow8vwmf">3</div>
                      </button>
                    </div>
                  </div>
                  <div class="_1a3ctne"></div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header> -->
  </section>
</template>

<script>
import mainSearch from './main-search.vue'
export default {
  name: 'app-header',
  props: {
    headerStatus: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      showSearch: false,
    }
  },
  components: {
    mainSearch,
  },
  methods: {
    toggleShowSearch() {
      this.showSearch = !this.showSearch
    },
  },
  watch: {
    headerStatus() {
      console.log('headerStatus is:', this.headerStatus)
      switch (this.headerStatus) {
        case 'top':
          this.showSearch = false
          break
        case 'firstScroll':
          break
        case 'shrinkSearchBar':
          break
      }
    },
  },
}
</script>

<style></style>
<!--  1  2 3  ,    true  false  -->
<!-- 1 2 | 3 true -->
<!-- 3 false  -->
//
