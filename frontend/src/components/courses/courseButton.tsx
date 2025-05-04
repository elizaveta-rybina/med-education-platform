import { ModalButtonAuthentication, ModalSignIn, NavButton } from 'components/shared'
import React, { useState } from 'react'

interface CourseButtonProps {
  isRegistered: boolean;
  isLoggedIn: boolean;
  onRegister: () => void;
}

const CourseButton: React.FC<CourseButtonProps> = ({ isRegistered, isLoggedIn, onRegister }) => {
  const [registered, setRegistered] = useState(isRegistered);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      if (!registered) {
        setRegistered(true);
        onRegister();
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className=''>
      {isLoggedIn ? (
        <NavButton 
          description={registered ? "Перейти к курсу" : "Зарегистрироваться"} 
          link={registered ? '/course/physiology' : undefined} 
          onClick={handleClick} 
        />
      ) : (
        <>
          <ModalButtonAuthentication 
            description="Зарегистрироваться"
            onClick={() => setShowModal(true)}
          />
          <ModalSignIn title="Войдите в аккаунт" isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
};

export default CourseButton;
