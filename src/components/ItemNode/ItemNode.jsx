import React from 'react';

import styles from './ItemNode.styles.scss';
import { useNavigate } from 'react-router-dom';

const ItemNode = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.itemNode} onClick={() => navigate(`product/?id=${item.id}`)}>
      <img src={`data:image/jpg;charset=utf8;base64,${item.src}`} alt="item" className={styles.image} />
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>{item.price} zł</div>
    </div>
  );
};

export default ItemNode;
