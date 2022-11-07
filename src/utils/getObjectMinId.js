export default function getObjectMinId(object) {
  console.log(object);
  const minId = Math.min(...object.map((o) => o.id));

  console.log(minId);
  return minId;
}

// module.exports = getObjectMinId;
