import React from "react";

import styles from './Widget.module.css'

function Widget({ id, backgroundColor }) {
  return (
    <div 
        style={{ 
            width: 'auto', height: '100%', backgroundColor,

        }}
        className={styles.widget}
    >
        {id}
    </div>
  );
}

export default Widget