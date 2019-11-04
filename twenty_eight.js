pins.analogWritePin(AnalogPin.P0, 0)
pins.analogWritePin(AnalogPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
let row = 0
let column = 0
let counter = 0
function updateled() {
    if (row == 4 && column == 4 && counter == 5) {
        led.unplot(0, 0)
        led.unplot(0, 1)
        led.unplot(0, 2)
        led.unplot(0, 3)
        led.unplot(0, 4)
        led.unplot(1, 0)
        led.unplot(1, 1)
        led.unplot(1, 2)
        led.unplot(1, 3)
        led.unplot(1, 4)
        led.unplot(2, 0)
        led.unplot(2, 1)
        led.unplot(2, 2)
        led.unplot(2, 3)
        led.unplot(2, 4)
        led.unplot(3, 0)
        led.unplot(3, 1)
        led.unplot(3, 2)
        led.unplot(3, 3)
        led.unplot(3, 4)
        led.unplot(4, 0)
        led.unplot(4, 1)
        led.unplot(4, 2)
        led.unplot(4, 3)
        led.unplot(4, 4)
        row = 0
        column = 0
        counter = 0
    } else {
        if (counter == 5 - column && row == 4) {
            counter = 0
            row = 0
            column++
        } else if (counter == 5 - column) {
            counter = 0
            row++
        } else {
        }
        counter++
        if (counter > 1) {
            led.unplot(row, counter - 2)
            led.plot(row, counter - 1)
        } else if (counter == 1) {
            led.plot(row, counter - 1)
        }
    }
}
basic.forever(function () {
    for (let index = 0; index <= 3071; index++) {
        if (index < 2046) {
            if (index <= 1023) {
                pins.analogWritePin(AnalogPin.P0, index)
            } else {
                pins.analogWritePin(AnalogPin.P0, 1023 - (index - 1023))
            }
        } else {
            pins.analogWritePin(AnalogPin.P0, 0)
        }
        if (index > 1023) {
            if (index <= 2046) {
                pins.analogWritePin(AnalogPin.P1, index - 1023)
            } else {
                pins.analogWritePin(AnalogPin.P1, 1023 - (index - 2047))
            }
        } else {
            pins.analogWritePin(AnalogPin.P1, 0)
        }
        if (index < 1023) {
            pins.analogWritePin(AnalogPin.P2, 1022 - index)
        } else if (index > 2048) {
            pins.analogWritePin(AnalogPin.P2, index - 2048)
        } else {
            pins.analogWritePin(AnalogPin.P2, 0)
        }
        updateled()
        control.waitMicros(1000)
    }
}) 
