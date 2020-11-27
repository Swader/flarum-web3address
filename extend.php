<?php

/*
 * This file is part of swader/fubulubu.
 *
 * Copyright (c) 2020 Bruno Škvorc.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Swader\Web3Address;

use Flarum\Extend;

use Flarum\Api\Event\Serializing;
use Flarum\User\Event\Saving;
use Swader\Web3Address\Listener\AddUserWeb3AddressAttribute;
use Swader\Web3Address\Listener\SaveUserWeb3Address;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Event())
        ->listen(Serializing::class, AddUserWeb3AddressAttribute::class)
        ->listen(Saving::class, SaveUserWeb3Address::class),
];
