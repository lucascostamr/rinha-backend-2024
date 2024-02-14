class MountExtractModel {
  mount (client) {
    if(!client) return null
    for(const field of ['saldo_inicial']) {
      if(!client[field]) return null
    }
  }
}

module.exports = MountExtractModel