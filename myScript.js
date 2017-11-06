$(function () {
    let vm = new Vue({
        el: '#app',
        data: {
            racing: false,
            winner: null,
            blueBike: 0,
            redBike: 0,
            tick: 0,
            interval: null
        },
        computed: {
            winning() {
                if (this.blueBike == this.redBike) return null

                return this.blueBike > this.redBike ? 'blueBike' : 'redBike'
            },

            rRStyle() {
                return {
                    left: `${this.redBike}vw`
                }
            },
            rRClass() {
                if (!this.winner) return
                return this.winner == 'redBike' ? 'animated tada infinite winner' : 'animated hinge'
            },
            bBStyle() {
                return {
                    left: `${this.blueBike}vw`
                }
            },
            bBClass() {
                if (!this.winner) return
                return this.winner == 'blueBike' ? 'animated tada infinite winner' : 'animated hinge'
            }
        },
        methods: {
            startRace() {
                if (this.winner) {
                    this.restart()
                    return
                }
                this.racing = true
                this.interval = setInterval(() => {
                    this.moveRiders()
                }, 50)
            },
            moveRiders() {
                this.tick++
                this.blueBike += (Math.random() >= .3) ? 1 : 0
                this.redBike += (Math.random() >= .3) ? 1 : 0
                this.winningRider()
            },
            winningRider() {
                if (this.blueBike == this.redBike) return

                if (this.blueBike >= 90) {
                    this.showWinner('blueBike')
                }

                if (this.redBike >= 90) {
                    this.showWinner('redBike')
                }
            },
            showWinner(rider) {
                clearInterval(this.interval)
                this.interval = null
                this.racing = false
                this.winner = rider
            },
            resetBikes() {
                this.racing = false
                this.winner = null
                this.blueBike = 0
                this.redBike = 0
                this.tick = 0
            }
        }
    })
})