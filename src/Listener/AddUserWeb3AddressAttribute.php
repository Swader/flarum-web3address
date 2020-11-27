<?php

namespace Swader\Web3Address\Listener;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;

class AddUserWeb3AddressAttribute
{
    public function handle(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes += [
                'web3address'        => $event->model->web3address,
            ];
        }
    }
}
