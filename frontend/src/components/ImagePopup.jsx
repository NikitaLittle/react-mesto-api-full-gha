function ImagePopup(props) {
  return (
    <div className={`popup image-popup ${props.card.link && 'popup_opened'}`}>
      <figure className='image-popup__figure'>
        <img className='image-popup__image' src={props.card.link} alt={props.card.name} />
        <button className='popup__close-button' type='button' onClick={props.onClose} />
        <figcaption className='image-popup__figcaption'>
          <h3 className='image-popup__title'>{props.card.name}</h3>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
