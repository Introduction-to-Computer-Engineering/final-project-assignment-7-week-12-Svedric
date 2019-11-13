pins.analogWritePin(AnalogPin.P0, 0)
pins.analogWritePin(AnalogPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
//Some variables for the screensaver:
let row = 0
let column = 0
let counter = 0
let wait = 0
let on = true

//Some variables for the calibration
let calibrationdone = false
let lowcalibrated = false
let highcalibrated = false
let lowcal1 = 0
let lowcal2 = 0
let lowcal3 = 0
let lowcalavg = 0
let highcal1 = 0
let highcal2 = 0
let highcal3 = 0
let highcalavg = 0
let sensorreading = 0 //The moisture sensor input reading
let displaylevel = 0 //The amount of bars the microbit will display in its led matrix given the input

function unplotall() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
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
}
function calibrate() {
    if (!lowcalibrated) {
        // Display down arrow since lowcalibrated is false
        led.plot(2, 0)
        led.plot(2, 1)
        led.plot(0, 2)
        led.plot(2, 2)
        led.plot(4, 2)
        led.plot(1, 3)
        led.plot(2, 3)
        led.plot(3, 3)
        led.plot(2, 4)
    } else if (!highcalibrated) {
        // Display up arrow since highcalibrated is false
        led.plot(2, 0)
        led.plot(1, 1)
        led.plot(2, 1)
        led.plot(3, 1)
        led.plot(0, 2)
        led.plot(2, 2)
        led.plot(4, 2)
        led.plot(2, 3)
        led.plot(2, 4)
    } else {
        calibrationdone = true
        basic.showString('Calibration success')
    }
}
input.onButtonPressed(Button.A, () => {
    // Button A calibrates low readings
    if (lowcal1 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        lowcal1 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (lowcal2 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        lowcal2 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (lowcal3 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        lowcal3 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
        lowcalavg = (lowcal1 + lowcal2 + lowcal3) / 3
        lowcalibrated = true
    } else {
        basic.showString('LOW CALIBRATION RESET')
        pins.digitalWritePin(DigitalPin.P8, 1)
        lowcal1 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
        lowcal2 = 0
        lowcal3 = 0
        lowcalibrated = false
        calibrationdone = false
    }
})
input.onButtonPressed(Button.B, () => {
    // Button B calibrates high readings
    if (highcal1 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        highcal1 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (highcal2 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        highcal2 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (highcal3 == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        highcal3 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
        highcalavg = (highcal1 + highcal2 + highcal3) / 3
        highcalibrated = true
    } else {
        basic.showString('HIGH CALIBRATION RESET')
        pins.digitalWritePin(DigitalPin.P8, 1)
        highcal1 = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P8, 0)
        highcal2 = 0
        highcal3 = 0
        highcalibrated = false
        calibrationdone = false
    }
})
function updateled() {
    if (wait == 20) {
        wait = 0
        if (on) {
            if (row == 4 && column == 4 && counter == 1) {
                on = false
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
        } else {
            if (row == 4 && column == 4 && counter == 1) {
                on = true
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
                    led.plot(row, counter - 2)
                    led.unplot(row, counter - 1)
                } else if (counter == 1) {
                    led.unplot(row, counter - 1)
                }
            }
        }
    } else {
        wait++
    }
}
basic.forever(function () {
    for (let index = 0; index <= 3071; index++) {
        if (pins.digitalReadPin(DigitalPin.P16) == 1) {
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
        } else {
            unplotall()
            if (!calibrationdone) {
                calibrate()
            } else {
                pins.digitalWritePin(DigitalPin.P8, 1)
                sensorreading = pins.analogReadPin(AnalogPin.P10)
                displaylevel = pins.map(sensorreading, lowcalavg, highcalavg, 0, 4)
                led.plot(0, 4 - displaylevel)
                led.plot(1, 4 - displaylevel)
                led.plot(2, 4 - displaylevel)
                led.plot(3, 4 - displaylevel)
                led.plot(4, 4 - displaylevel)
            }
        }
        control.waitMicros(1000)
    }
})
