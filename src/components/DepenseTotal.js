import React from 'react';

function DepenseTotal({ depenses }) {
  const total = depenses.reduce((acc, depense) => acc + depense.getMontant(), 0);

  return (
    <div>
      <h2>Total des dépenses : {total} €</h2>
    </div>
  );
}

export default DepenseTotal;
