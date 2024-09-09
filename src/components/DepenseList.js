import React from 'react';

function DepenseList({ depenses }) {
  return (
    <div>
      <h2>Liste des dépenses</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Catégorie</th>
            <th>Justificatif</th>
          </tr>
        </thead>
        <tbody>
          {depenses.map((depense, index) => (
            <tr key={index}>
              <td>{depense.description}</td>
              <td>{depense.montant} €</td>
              <td>{depense.date}</td>
              <td>{depense.categorie}</td>
              <td>
                {depense.pieceJointe ? (
                  <a
                    href={URL.createObjectURL(depense.pieceJointe)} // Crée un lien pour télécharger le fichier
                    download={depense.pieceJointe.name}
                  >
                    Télécharger
                  </a>
                ) : (
                  'Aucun'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepenseList;
