import React, { useEffect } from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import './styles.css'

const BackOnTop = () => {
    useEffect(() => {
        // Get the button
        let mybutton = document.getElementById("myBtn");
        
        // Initially hide the button
        if (mybutton) {
            mybutton.style.display = "none";
        }

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "flex";
            } else {
                mybutton.style.display = "none";
            }
        }

        // When the user scrolls down 20px from the top of the document, show the button
        window.addEventListener('scroll', scrollFunction);

        // Cleanup scroll listener when component unmounts
        return () => window.removeEventListener('scroll', scrollFunction);
    }, []); // Empty dependency array means this runs once when component mounts

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className='back-top-top-btn' id='myBtn' onClick={topFunction}>
            <ArrowUpwardRoundedIcon />
        </div>
    )
}

export default BackOnTop