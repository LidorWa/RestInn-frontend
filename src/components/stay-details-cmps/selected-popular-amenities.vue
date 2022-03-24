<template>
            <section class="selected-popular-amenities">
            <div class="popular-amenities">
              <div class="popular-amenities-svg">
                <img src="../../assets/svgs/great-comm.svg" />
              </div>
              <div class="popular-amenities-text">
                <div class="popular-amenities-title">Great communication</div>
                <div
                  class="popular-amenities-description"
                >100% of recent guests rated {{ stay.host.fullname }} 5-star in communication</div>
              </div>
            </div>
            <div class="popular-amenities">
              <div class="popular-amenities-svg">
                <img src="../../assets/svgs/great-location.svg" />
              </div>
              <div class="popular-amenities-text">
                <div class="popular-amenities-title">Great location</div>
                <div
                  class="popular-amenities-description"
                >100% of recent guests gave the location a 5-star rating</div>
              </div>
            </div>
                        <div class="popular-amenities">
              <div class="popular-amenities-svg">
                <img src="../../assets/svgs/self-checkin.svg" />
              </div>
              <div class="popular-amenities-text">
                <div class="popular-amenities-title">Self check-in</div>
                <div
                  class="popular-amenities-description"
                >Check yourself in with the lockbox</div>
              </div>
            </div>
                        <div class="popular-amenities">
              <div class="popular-amenities-svg">
                <img src="../../assets/svgs/wifi.svg" />
              </div>
              <div class="popular-amenities-text">
                <div class="popular-amenities-title">Wifi</div>
                <div
                  class="popular-amenities-description"
                >Guests often search for this popular amenity</div>
              </div>
            </div>
          </section>
</template>

<script>
export default {
  name: 'selected-popular-amenities',
    props:{
        stay:{
            type: Object,
            required: true,
        }
    }
}
</script>

<style>

</style>