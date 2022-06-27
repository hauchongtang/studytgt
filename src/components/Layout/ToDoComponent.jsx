import React from "react";
import { useState } from "react";
import { Card, CardBody } from "reactstrap";

const ToDoComponent = ({ name, title }) => {
    const [done, setDone] = useState(false)
    return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Card style={{ width: '720px', backgroundColor: done ? 'rgba(50,205,50, 0.1)' : 'rgba(255, 20, 0, 0.1)' }}>
                <CardBody>
                    <h3 style={{ fontSize: '20px', textAlign: 'start', paddingLeft: '16px', textDecoration: done ? 'line-through' : 'none', paddingTop: '8px' }}>{title}</h3>             
                </CardBody>
            </Card>
            <button
                style={{ outline: 'none', backgroundColor: done ? 'rgba(50,205,50, 0.3)' : 'rgba(255, 20, 0, 0.3)' , border: '0px', borderRadius: '0px', padding: '8px' }}
                onClick={() => setDone(!done)}
            >
                {done ? '✅' : '❌'}
            </button>
            </div>
    )
}

export default ToDoComponent