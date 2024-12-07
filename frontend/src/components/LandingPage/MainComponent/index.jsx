import React from 'react'
import { RWebShare } from "react-web-share";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './styles.css'
import Button from '../../Common/Button'
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'
import { motion } from "framer-motion"
import Footer from '../../Common/Footer'
//imported framer motion to implement animations


const MainComponent = () => {
  return (
    <div className='main-component'>
        <div className='flex-info'>
          <div className='left-component'>
            <motion.h1 className='track-crypto-heading'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}>
              Track Crypto
            </motion.h1>

            <motion.h1 className='real-time-heading'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5 }}>
              Real Time
            </motion.h1>

            <motion.p className='info-text'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.75 }}>
              Track crypto through a public api in real time. Visit the dashboard to
              do so!
            </motion.p>

            <motion.div className='btn-flex'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 1 }}>
              <Link to='/dashboard'>
                <Button text={"Dashboard"} />
              </Link>
              <RWebShare
                data={{
                  text: "CryptoDashboard made by Shantanu using MERN Stack.",
                  url: "https://crypto-dashboard-jan.netlify.app",
                  title: "CryptoTracker.",
                }}
                onClick={() => toast.info("App Shared!")}
              >
                <Button text={"Share"} outlined={true} />
              </RWebShare>
            </motion.div>
          </div>

          {/* iphone animation  */}
          <div className='phone-container'>
            <motion.img src={iphone} className='iphone'
              initial={{ y: -10 }} //oscillating -10 to 10 in y axis
              animate={{ y: 10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror", //same type of motion everytime
                duration: 2, //duration of one to and fro
                repeat: Infinity, //repeats the animation infinite times
              }} />
            <img src={gradient} className='gradient' />
          </div>
        </div>
      {/* <Footer className="footer" /> */}
    </div>
  )
}

export default MainComponent