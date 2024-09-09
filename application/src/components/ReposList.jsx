import React from 'react';
import classes from './ReposList.module.css'

function ReposList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p>Nema repozitorija za prikazivanje.</p>;
  }

  return (
    <div>
      <h2>Repozitoriji:</h2>
      <ul className='text-start'>
        {repos.map((repo) => (
          <li className="mb-3" key={repo.id}>
            <a className="text-uppercase text-light" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a> - {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReposList;
