import React from "react";

import styles from './Widget.module.css'

function Widget({ id, backgroundColor }) {
  return (
    <div 
        style={{ 
            width: '100%', height: '100%', backgroundColor,

        }}
        className={styles.widget}
    >
        {id}
    </div>
  );
}

export default Widget