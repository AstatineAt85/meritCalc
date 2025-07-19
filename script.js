document.getElementById('aggregateForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const netMarks = parseFloat(document.getElementById('netMarks').value);
  const totalNetMarks = parseFloat(document.getElementById('totalNetMarks').value);
  const matricMarks = parseFloat(document.getElementById('matricMarks').value);
  const totalMatricMarks = parseFloat(document.getElementById('totalMatricMarks').value);
  const interMarks = parseFloat(document.getElementById('interMarks').value);
  const totalInterMarks = parseFloat(document.getElementById('totalInterMarks').value);

  const netPercent = (netMarks / totalNetMarks) * 100;
  const matricPercent = (matricMarks / totalMatricMarks) * 100;
  const interPercent = (interMarks / totalInterMarks) * 100;

  const aggregate = (netPercent * 0.75) + (matricPercent * 0.10) + (interPercent * 0.15);

  document.getElementById('result').textContent = `Your Aggregate is: ${aggregate.toFixed(2)}%`;
});
