import axios from 'axios';

export const sendOtp = async (phoneNumber) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const response = await axios.post(
      'https://api.twilio.com/2010-04-01/Accounts/AC032272c1a9f5f306a4411da341a670c1/Messages.json',
      new URLSearchParams({
        Body: `Your verification code is ${otp}`,
        From: '+27 87 723 9341',
        To: phoneNumber,
      }),
      {
        auth: {
          username: 'AC032272c1a9f5f306a4411da341a670c1',
          password: '2ca803cd5285618ca1e0d9cb81c12d03',
        },
      }
    );

    console.log('OTP Sent:', response.data);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error.response?.data || error.message);
    throw new Error('Failed to send OTP');
  }
};
