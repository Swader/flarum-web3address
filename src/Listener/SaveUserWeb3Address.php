<?php

namespace Swader\Web3Address\Listener;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUserWeb3Address
{
    public function handle(Saving $event)
    {
        $user = $event->user;
        $data = $event->data;
        $actor = $event->actor;

        $isSelf = $actor->id === $user->id;
        $canEdit = $actor->can('edit', $user);
        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['web3address'])) {
            if (!$isSelf) {
                $actor->assertPermission($canEdit);
            }

            //if (!$actor->isAdmin()) {
            chdir(__DIR__ . "/../../js");
            $command = "node src/forum/scripts/verify.js \"Extreme Ownership\" " . $attributes['signedMessage'] . " " . $attributes['web3address'] . " 2>&1";
            exec($command, $out, $err);

            if ($err) {
                throw new \Exception("Verification failed: " . is_array($out) ? array_pop($out) : $out);
                return false;
            }
            //}
            $user->web3address = $attributes['web3address'];
            $user->save();
        }
    }
}
