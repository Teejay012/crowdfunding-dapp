import React from 'react'

const Footer = () => {

  const productList = ["Market", "ERC20 Token", "Donation"];

  const contactList = ["support@web3developer.com", "info@example.com", "Contact Us"];

  const usefulLinks = ["Home", "About Us", "Company Bio"];

  return (
    <footer className='text-center text-white backgroundMain lg:text-left'>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Your web3 developer
            </h6>

            <p>React state management involves handling the dynamic data of a React application. It ensures that your app's state is properly tracked, shared, and updated as needed</p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {usefulLinks.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p className='mb-4' key={i + 1}>
                <a href="#!">
                  {el}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="backgroundMain p-6 text-center">
        <span>2023 Copyright: </span>
        <a href="/" className="fontt-semibold">Web3 developer</a>
      </div>
    </footer>
  )
};

export default Footer;