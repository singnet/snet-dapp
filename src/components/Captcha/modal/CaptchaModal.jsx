import './CaptchaModal.css';

const CaptchaModal = () => {
    return (
        <div className='captcha-modal overlay' id="modalOverlay">
            <div className='modal' id="modal">
                <div id="captchaForm" className='captchaForm'/>
            </div>
        </div>
    )
}

export default CaptchaModal;