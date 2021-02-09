import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

function TasksPage() {
  const context = useContext(AuthContext);

    return (
        <div>
            test
        </div>
    );
}

export default TasksPage;
