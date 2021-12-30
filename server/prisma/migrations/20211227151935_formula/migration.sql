-- CreateTable
CREATE TABLE `Formula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addYear` INTEGER NOT NULL,
    `addMonth` INTEGER NOT NULL,
    `addDay` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
