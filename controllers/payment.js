import crypto from 'crypto';
import fs from 'fs';
import Razorpay from 'razorpay';
import shortid from 'shortid';

const razorpay = new Razorpay({
    key_id: 'rzp_test_jsXvpbAIRO5fPn',
    key_secret : 'PGA2XGINWWQRAO4Klb5NBhcB'
  })

const verify = (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		fs.writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
}

const makePayment =  async (req, res) => {
	const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
}

export {
    makePayment,
    verify
}