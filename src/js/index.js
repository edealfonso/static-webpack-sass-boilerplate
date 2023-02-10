console.log('yes');

function iLoveCinema() {
  const trully = true;
  if (trully) console.log('yes');
  fullme();
}

function fullme() {
  console.log('no , but');
  iLoveCinema();
}

if (window.innerHeight > 900) {
  iLoveCinema()
}
else {
  fullme();
}