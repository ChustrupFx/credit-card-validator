const input = document.querySelector('#ccnumber')
const validationMsg = document.querySelector('#validation-msg')
const networkImg = document.querySelector('#validator-img')

const lunhAlgorithmTest = ccnumber => {
    const originalNumber = ccnumber.trim()
    const multipliedInOddPositions = originalNumber.split('').map((num, index) => {
        if ((index + 1) % 2 !== 0) {
            return (num * 2).toString()
        }

        return num
    })
    const subtractedHigherThanNineNumbers = multipliedInOddPositions.map(num => {
        if (num > 9) {
            return (num - 9).toString()
        }

        return num
    })

    const addedTogether = subtractedHigherThanNineNumbers.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0)
    if (addedTogether % 10 === 0) {
        return true
    }

    return false
}

const regexPatternTest = ccnumber => {
    const patterns = Object.values(creditCardFormats).reduce((accumulator, currentValue) => {
        accumulator.push(currentValue.pattern)
    
        return accumulator
    }, [])
    
    return patterns.some((element) => {
        return ccnumber.match(element)
    })
}

const validateCCNumber = ccnumber => {
    const luhnTest = lunhAlgorithmTest(ccnumber)
    const regexTest = regexPatternTest(ccnumber)

    return luhnTest && regexTest
}

const showCCValidation = validation => {
    const spanClass = validation ? 'valid' : 'invalid'
    const spanMsg = validation ? 'The number is valid!' : 'The number is invalid!'
    validationMsg.className = spanClass
    validationMsg.innerHTML = spanMsg
}

const creditCardFormats = {
    american_express: {
        name: 'American Express',
        pattern: /^(34|37)\d{13}$/g,
    },
    visa_electron: {
        name: 'Visa Electron',
        pattern: /(?=^\d{16}$)(4026|417500|4508|4844|4913|4917)(\d{10}|\d{12})/g,
    },
    visa: {
        name: 'Visa',
        pattern: /^4\d{12,18}$/g,
    },
    master_card: {
        name: 'Master Card',
        pattern: /(?=^\d{16}$)(5[1-5]|(222[1-8][0-9]{2}|2229[0-8][0-9]|22299[0-9]|22[3-9][0-9]{3}|2[3-6][0-9]{4}|27[01][0-9]{3}|2720[0-8][0-9]|27209[0-9]))(\d{10})/g,
    },
    maestro: {
        name: 'Maestro',
        pattern: /^(50[0-9]{4}|5[6-8][0-9]{4}|6[0-9]{5})\d{6,13}$/g,
    },
    jcb: {
        name: 'JCB',
        pattern: /^(352[89]|35[3-8][0-9])\d{12}$/g
    },
    insta_payment: {
        name: 'InstaPayment',
        pattern: /^(637|638|639)\d{13}$/g
    },
    discover: {
        name: 'Discover',
        pattern: /(?=^\d{16}$)((62212[6-9]|6221[3-9][0-9]|622[2-9][0-9]{2}|6229[01][0-9]|62292[0-5])|64[4-9]|65|6011)\d+/g
    },
    diners_club_usa_canada: {
        name: 'Diners Club - USA & Canada',
        pattern: /^(54|55)\d{14}$/g
    },
    diners_club_international: {
        name: 'Diners Club - International',
        pattern: /^(?=^\d{14}$)(30[0-5]|309|36|3[89])(\d+)$/g
    },
    diners_club_carte_blanche: {
        name: 'Diners Club - Carte Blanche',
        pattern: /^(30[0-5])\d{11}$/g
    },
    china_unionpay: {
        name: 'China UnionPay',
        pattern: /^(62)(\d{14,17})$/g
    },
    uatp: {
        name: 'UATP',
        pattern: /^(1)(\d{14})$/g
    },
    dankort: {
        name: 'Dankort',
        pattern: /^(5019)(\d{12})$/g
    },
    inter_payment: {
        name: 'Inter Payment',
        pattern: /^(636)(\d{13,16})$/g
    }

}

input.addEventListener('keyup', e => {
    showCCValidation(validateCCNumber(e.target.value))
})