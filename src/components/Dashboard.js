import React from 'react';
import DepenseList from './DepenseList';

function Dashboard({ depenses }) {
  const depensesAvecJustificatifs = depenses.filter(depense => depense.pieceJointe);

  return (
    <div className="dashboard">
      {/* Bloc pour l'affichage des dépenses */}
      <div className="depenses-list">
        <DepenseList depenses={depenses} />
      </div>

      {/* Bloc séparé pour l'affichage des pièces justificatives */}
      <div className="justificatifs-list">
        <h2>Pièces Justificatives</h2>
        {depensesAvecJustificatifs.length > 0 ? (
          <ul>
            {depensesAvecJustificatifs.map((depense, index) => (
              <li key={index}>
                {/* Utiliser les valeurs individuelles ici */}
                <span>{depense.description} - {depense.montant} € - {depense.date}</span>
                <a
                  href={URL.createObjectURL(depense.pieceJointe)}
                  download={depense.pieceJointe.name}
                  style={{ marginLeft: '10px' }}
                >
                  Télécharger Justificatif
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune pièce justificative disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
