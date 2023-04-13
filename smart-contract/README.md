Pertanyaan:
    1. Jika NFT sudah minted, pembeli menjualnya sebelum acara, akan bagaimana?
        1a. Kalau bisa dijual belikan sebelum acara, apakah akan sama saja dengan calo?
        1b. Kalau tidak bisa diperjual belikan, apakah akan jadi masalah?
        1c. Jika NFT menjadi milik Tibloc, lalu setelah sued ticket, NFT di transfer ke wallet client? -> paling makesense tapi:
            - Tidak ada opsi refund?
            - Jika client tidak datang, apa yang terjadi dengan kepemilikan NFT nya?
                - Solusi: Dapat dibuat tombol "Get NFT" yang hanya dapat di klik setelah tanggal > tanggal acara

wallet yang mint NFT = owner
untuk flagUsed -> bisa kita taruh di contract nya, sama dengan price (bisa kita update)
karna owner yang punya wewenang, kalau owner dari awal langsung ke customer tibloc, nanti dia bisa jual dan flag used sendiri(flag used ini gamasalah sbnrnya)

kalau dari awal di mint oleh tibloc dulu, tibloc as owner
tibloc bisa jalanin flagUsed nya -> setelah di update statusnya jadi used, sekalian transfer nft nya ke wallet customer

setelahnya, customer punya hak penuh atas nft nya, bisa dijual di marketplace 

======== Final
    Plan A
        Customer yang minting, gabisa change price kalau tanggal lebih kecil dari tanggal event
    Plan B
        tibloc yg minting

    yang kita simpan di QR merupakan data event
    yang 

==============
yarn add --save-dev || yarn add -D || yarn install
yarn add --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv @ethersproject/abi@^5.0.0 @ethersproject/bytes@^5.0.0 @ethersproject/providers@^5.0.0 ethers@^5.1.3 typescript@>=4.3.0 @ensdomains/ens@^0.4.4 @ensdomains/resolver@^0.2.4 @ensdomains/resolver@^0.2.4