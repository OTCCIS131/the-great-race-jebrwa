$(function(){
    let vm = new Vue({
       el: '#exciteBike',
      data: {
       racing: false,
       winner: null,
       redBike: 0,
       blueBike: 0,
       tick: 0,
       intervall: null,
        },
       methods: {

           go() {
               if (this.winner) {
                   this.reset()
                   return
               }
               this.racing = true
               this.interval = setInterval(() => {
                   this.moveRider()

               }, 85)
           },
           moveRider() {
               this.tick++
               this.redBike += (Math.random() >= .4) ? 2 : 1
               this.blueBike += (Math.random() >= .4) ? 2 : 1
               this.decision()
           },
           decision() {
               if (this.redBike == this.blueBike) return

               if (this.redBike >= 87) {
                   this.showWin('redBike')
               }

               if (this.blueBike >= 87) {
                   this.showWin('blueBike')
               }
           },
           showWin(rider) {
               clearInterval(this.interval)
               this.interval = null
               this.racing = false
               this.winner = rider
           },
           reset() {
               this.racing = false
               this.winner = null
               this.redBike = 0
               this.blueBike = 0
               this.tick = 0
           }
       },
       computed: {

           redStyles() {
               return {
                   left: `${this.redBike}vw`
               }
           },
           redClass() {
               if (!this.winner) return
               return this.winner == 'redBike' ? 'animated flash infinite winner' : 'animated zoomOutRight'
           },
           blueStyles() {
               return {
                   left: `${this.blueBike}vw`
               }
           },
           blueClass() {
               if (!this.winner) return
               return this.winner == 'blueBike' ? 'animated flash infinite winner' : 'animated zoomOutRight'
           }
       }
    })
})