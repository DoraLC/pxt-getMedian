//%color=#B40431 icon="\uf162" block="median"

namespace median {
    function getMedian(bArray: number[]): number {
        let bTab: number[] = []
        let iFilterLen = bArray.length
        let bTemp = 0
        for (let i = 0; i < iFilterLen; i++) {
            bTab[i] = bArray[i]
        }
        for (let i = 0; i < iFilterLen - 1; i++) {
            for (let j = 0; j < iFilterLen - i - 1; j++) {
                if (bTab[j] > bTab[j + 1]) {
                    bTemp = bTab[j]
                    bTab[j] = bTab[j + 1]
                    bTab[j + 1] = bTemp
                }
            }
        }
        if ((iFilterLen & 1) > 0)
            bTemp = bTab[(iFilterLen - 1) / 2]
        else
            bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2
        return bTemp
    }

    /**
     * Get analog median reading. The larger the sample size is, the more time this will take to finish. 
     * @param size sample size; eg: 50, 20, 60, 100
     */
    //%block="get analog median reading size %size|pin %argpin"
    //%pinarg.fieldEditor="gridpicker" pinarg.fieldOptions.columns=5
    export function medianAnalog(size: number, argpin: AnalogPin): number {
        let array: number[] = []
        for (let i = 0; i < size; i++) {
            array[i] = pins.analogReadPin(argpin)
            basic.pause(10)
        }
        return getMedian(array)
    }
}